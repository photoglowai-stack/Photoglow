import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Terminal, 
  X, 
  Minimize2, 
  Maximize2, 
  Trash2,
  Copy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

/**
 * ADMIN CONSOLE - Terminal flotant pour debug
 * 
 * Capture et affiche en temps réel :
 * - Tous les console.log/warn/error
 * - Toutes les requêtes fetch (méthode, URL, payload, réponse)
 * - Timestamps précis
 * - Couleurs par type de log
 * - Scrollable, minimisable, clearable
 */

type LogLevel = 'info' | 'warn' | 'error' | 'success' | 'fetch-request' | 'fetch-response' | 'fetch-error';

interface LogEntry {
  id: number;
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

let logIdCounter = 0;
const logListeners: ((entry: LogEntry) => void)[] = [];

// Intercepter console.log/warn/error
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

const addLog = (level: LogLevel, message: string, data?: any) => {
  const entry: LogEntry = {
    id: logIdCounter++,
    timestamp: new Date().toISOString().split('T')[1].split('.')[0], // HH:MM:SS
    level,
    message,
    data
  };
  
  logListeners.forEach(listener => listener(entry));
};

// Override console methods
console.log = (...args: any[]) => {
  originalConsoleLog(...args);
  addLog('info', args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
};

console.warn = (...args: any[]) => {
  originalConsoleWarn(...args);
  addLog('warn', args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
};

console.error = (...args: any[]) => {
  originalConsoleError(...args);
  addLog('error', args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' '));
};

// Intercepter fetch
const originalFetch = window.fetch;
window.fetch = async (...args: any[]) => {
  const [url, options = {}] = args;
  const method = options.method || 'GET';
  
  // Log request
  addLog('fetch-request', `${method} ${url}`, {
    headers: options.headers,
    body: options.body ? (typeof options.body === 'string' ? JSON.parse(options.body) : options.body) : undefined
  });
  
  try {
    const response = await originalFetch(...args);
    const clonedResponse = response.clone();
    
    // Log response
    try {
      const contentType = response.headers.get('content-type');
      let responseData: any;
      
      if (contentType?.includes('application/json')) {
        responseData = await clonedResponse.json();
      } else if (contentType?.includes('text/')) {
        responseData = await clonedResponse.text();
      } else {
        responseData = `[${contentType || 'binary'}]`;
      }
      
      addLog(
        response.ok ? 'fetch-response' : 'fetch-error',
        `${method} ${url} → ${response.status} ${response.statusText}`,
        responseData
      );
    } catch (parseError) {
      addLog('fetch-response', `${method} ${url} → ${response.status} (non-parsable)`, null);
    }
    
    return response;
  } catch (error: any) {
    addLog('fetch-error', `${method} ${url} → FAILED`, error.message);
    throw error;
  }
};

interface AdminConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminConsole({ isOpen, onClose }: AdminConsoleProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Subscribe to logs
  useEffect(() => {
    const handleNewLog = (entry: LogEntry) => {
      setLogs(prev => [...prev, entry].slice(-200)); // Keep last 200 logs
    };
    
    logListeners.push(handleNewLog);
    
    return () => {
      const index = logListeners.indexOf(handleNewLog);
      if (index > -1) logListeners.splice(index, 1);
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  // Clear logs
  const handleClear = () => {
    setLogs([]);
    addLog('info', '🧹 Console cleared');
  };

  // Copy all logs
  const handleCopy = () => {
    const text = logs.map(log => 
      `[${log.timestamp}] [${log.level.toUpperCase()}] ${log.message}${log.data ? '\n' + JSON.stringify(log.data, null, 2) : ''}`
    ).join('\n\n');
    
    navigator.clipboard.writeText(text);
    addLog('success', '📋 Logs copied to clipboard');
  };

  // Get log color
  const getLogColor = (level: LogLevel) => {
    switch (level) {
      case 'info': return 'text-gray-300';
      case 'warn': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'success': return 'text-green-400';
      case 'fetch-request': return 'text-blue-400';
      case 'fetch-response': return 'text-green-300';
      case 'fetch-error': return 'text-red-500';
      default: return 'text-gray-400';
    }
  };

  // Get log icon
  const getLogIcon = (level: LogLevel) => {
    switch (level) {
      case 'info': return 'ℹ️';
      case 'warn': return '⚠️';
      case 'error': return '❌';
      case 'success': return '✅';
      case 'fetch-request': return '📤';
      case 'fetch-response': return '📥';
      case 'fetch-error': return '🔴';
      default: return '•';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed ${isExpanded ? 'inset-4' : 'bottom-4 right-4'} z-[9999] transition-all duration-300`}
      style={{ 
        width: isExpanded ? 'auto' : (isMinimized ? '320px' : '600px'),
        height: isExpanded ? 'auto' : (isMinimized ? '48px' : '400px')
      }}
    >
      <Card className="h-full flex flex-col bg-[#0A0A0A] border-pink-500/30 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between p-3 border-b border-pink-500/20 bg-[#111]">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-pink-400 font-mono">Admin Console</span>
            <Badge variant="outline" className="bg-pink-500/10 text-pink-300 border-pink-500/30 text-xs">
              {logs.length}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setAutoScroll(!autoScroll)}
              className="h-7 w-7 p-0 text-gray-400 hover:text-pink-400"
              title={autoScroll ? 'Disable auto-scroll' : 'Enable auto-scroll'}
            >
              {autoScroll ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              className="h-7 w-7 p-0 text-gray-400 hover:text-pink-400"
              title="Copy logs"
            >
              <Copy className="w-3 h-3" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={handleClear}
              className="h-7 w-7 p-0 text-gray-400 hover:text-pink-400"
              title="Clear logs"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-7 w-7 p-0 text-gray-400 hover:text-pink-400"
              title={isExpanded ? 'Restore' : 'Maximize'}
            >
              {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-7 w-7 p-0 text-gray-400 hover:text-pink-400"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              <Minimize2 className="w-3 h-3" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="h-7 w-7 p-0 text-gray-400 hover:text-red-400"
              title="Close"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* LOGS CONTENT */}
        {!isMinimized && (
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 font-mono text-xs"
            style={{ 
              scrollbarWidth: 'thin',
              scrollbarColor: '#E056FD33 #0A0A0A'
            }}
          >
            {logs.length === 0 ? (
              <div className="text-center text-gray-600 py-12">
                <Terminal className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No logs yet...</p>
                <p className="text-xs mt-1 opacity-50">Requests and logs will appear here</p>
              </div>
            ) : (
              logs.map((log) => (
                <div 
                  key={log.id} 
                  className={`${getLogColor(log.level)} hover:bg-white/5 p-2 rounded transition-colors`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 select-none">{log.timestamp}</span>
                    <span className="select-none">{getLogIcon(log.level)}</span>
                    <div className="flex-1 break-words">
                      <div className="whitespace-pre-wrap">{log.message}</div>
                      {log.data && (
                        <details className="mt-1">
                          <summary className="cursor-pointer text-gray-500 hover:text-gray-400 text-[10px]">
                            [data]
                          </summary>
                          <pre className="mt-1 p-2 bg-black/30 rounded text-[10px] overflow-x-auto">
                            {JSON.stringify(log.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* FOOTER STATS */}
        {!isMinimized && (
          <div className="flex items-center justify-between p-2 border-t border-pink-500/20 bg-[#111] text-[10px] text-gray-500">
            <div className="flex items-center gap-3">
              <span>ℹ️ {logs.filter(l => l.level === 'info').length}</span>
              <span>⚠️ {logs.filter(l => l.level === 'warn').length}</span>
              <span>❌ {logs.filter(l => l.level === 'error').length}</span>
              <span>📤 {logs.filter(l => l.level === 'fetch-request').length}</span>
              <span>📥 {logs.filter(l => l.level === 'fetch-response').length}</span>
            </div>
            <span className="font-mono">{logs.length}/200</span>
          </div>
        )}
      </Card>
    </div>
  );
}

// Export helper pour ajouter des logs manuellement
export const consoleLog = {
  info: (message: string, data?: any) => addLog('info', message, data),
  warn: (message: string, data?: any) => addLog('warn', message, data),
  error: (message: string, data?: any) => addLog('error', message, data),
  success: (message: string, data?: any) => addLog('success', message, data),
};
