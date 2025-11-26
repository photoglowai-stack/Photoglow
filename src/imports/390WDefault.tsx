import svgPaths from "./svg-cvedlvvamu";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="bg-clip-text bg-gradient-to-r flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold from-[#f6339a] justify-center leading-[0] relative shrink-0 text-[24px] text-nowrap to-[#8e51ff]" style={{ WebkitTextFillColor: "transparent" }}>
        <p className="leading-[32px] whitespace-pre">PhotoGlow Admin V3</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#99a1af] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Interface de test - Génération IA avec photos</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading />
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#d1d5dc] text-[12px] w-full">
        <p className="leading-[16px]">Crédits restants</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#fdc700] text-[20px] w-full">
        <p className="leading-[28px]">0</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Button() {
  return (
    <div className="box-border content-stretch flex h-[32px] items-center justify-center px-[10px] py-0 relative rounded-[8px] shrink-0" data-name="Button">
      <div className="relative shrink-0 size-[16px]" data-name="Component 1">
        <div className="absolute bottom-1/2 left-[12.5%] right-[12.5%] top-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-11.11%_-5.56%]" style={{ "--stroke-0": "rgba(209, 213, 220, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
              <path d={svgPaths.p323cc480} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_12.5%_66.67%_66.67%]" data-name="Vector">
          <div className="absolute inset-[-20%]" style={{ "--stroke-0": "rgba(209, 213, 220, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
              <path d="M4 0.666667V4H0.666667" id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[12.5%] left-[12.5%] right-[12.5%] top-1/2" data-name="Vector">
          <div className="absolute inset-[-11.11%_-5.56%]" style={{ "--stroke-0": "rgba(209, 213, 220, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8">
              <path d={svgPaths.p12f14b00} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[66.67%_66.67%_12.5%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-20%]" style={{ "--stroke-0": "rgba(209, 213, 220, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
              <path d="M4 0.666667H0.666667V4" id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(130,0,219,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[13px] py-[9px] relative w-full">
          <div className="relative shrink-0 size-[16px]" data-name="Component 1">
            <div className="absolute inset-[8.33%_41.67%_41.67%_8.33%]" data-name="Vector">
              <div className="absolute inset-[-8.33%]" style={{ "--stroke-0": "rgba(252, 200, 0, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                  <path d={svgPaths.p341ae80} id="Vector" stroke="var(--stroke-0, #FCC800)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[43.21%_8.36%_8.37%_43.08%]" data-name="Vector">
              <div className="absolute inset-[-8.61%_-8.58%_-8.6%_-8.58%]" style={{ "--stroke-0": "rgba(252, 200, 0, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                  <path d={svgPaths.p36a51600} id="Vector" stroke="var(--stroke-0, #FCC800)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-[58.33%] left-[29.17%] right-[66.67%] top-1/4" data-name="Vector">
              <div className="absolute inset-[-25%_-100%]" style={{ "--stroke-0": "rgba(252, 200, 0, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
                  <path d={svgPaths.p39273870} id="Vector" stroke="var(--stroke-0, #FCC800)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-[57.83%_27.46%_27.46%_60.79%]" data-name="Vector">
              <div className="absolute inset-[-28.33%_-35.46%]" style={{ "--stroke-0": "rgba(252, 200, 0, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
                  <path d={svgPaths.p15309c00} id="Vector" stroke="var(--stroke-0, #FCC800)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </svg>
              </div>
            </div>
          </div>
          <Container4 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <BackgroundBorder />
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="absolute bg-gradient-to-r box-border content-stretch flex flex-col from-[#101828] items-start left-0 pb-[17px] pt-[16px] px-[16px] right-0 to-[#000000] top-[57px]" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#1e2939] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <Container5 />
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[4px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[16px] whitespace-pre">Gen</p>
      </div>
    </div>
  );
}

function Tab() {
  return (
    <div className="bg-gradient-to-r box-border content-stretch flex from-[#f6339a] gap-[6px] h-[25px] items-center justify-center pl-[30.27px] pr-[30.26px] py-[5px] relative rounded-[14px] shrink-0 to-[#9810fa]" data-name="Tab">
      <div className="relative shrink-0 size-[16px]" data-name="Component 1">
        <div className="absolute inset-[8.323%]" data-name="Vector">
          <div className="absolute inset-[-5%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
              <path d={svgPaths.p6a5a100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-3/4 left-[83.33%] right-[16.67%] top-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-25%_-0.67px]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
              <path d="M0.666667 0.666667V3.33333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[83.33%] left-3/4 right-[8.33%] top-[16.67%]" data-name="Vector">
          <div className="absolute inset-[-0.67px_-25%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
              <path d="M3.33333 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-[8.33%] right-3/4 top-3/4" data-name="Vector">
          <div className="absolute inset-[-25%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
              <path d={svgPaths.p2b1c1400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
      <Margin />
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[4px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#d1d5dc] text-[12px] text-nowrap">
        <p className="leading-[16px] whitespace-pre">Gallery</p>
      </div>
    </div>
  );
}

function Tab1() {
  return (
    <div className="box-border content-stretch flex gap-[6px] h-[25px] items-center justify-center pl-[22.04px] pr-[22.05px] py-[5px] relative rounded-[14px] shrink-0" data-name="Tab">
      <div className="relative shrink-0 size-[16px]" data-name="Component 1">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-5.556%]" style={{ "--stroke-0": "rgba(209, 213, 220, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path d={svgPaths.p3b86be00} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[29.17%_54.17%_54.17%_29.17%]" data-name="Vector">
          <div className="absolute inset-[-25%]" style={{ "--stroke-0": "rgba(209, 213, 220, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
              <path d={svgPaths.p2b1c1400} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[12.5%] left-1/4 right-[12.5%] top-[47.2%]" data-name="Vector">
          <div className="absolute inset-[-10.34%_-6.67%]" style={{ "--stroke-0": "rgba(209, 213, 220, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
              <path d={svgPaths.p14dd1bc0} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
      <Margin1 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[4px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#d1d5dc] text-[12px] text-nowrap">
        <p className="leading-[16px] whitespace-pre">Health</p>
      </div>
    </div>
  );
}

function Tab2() {
  return (
    <div className="box-border content-stretch flex gap-[6px] h-[25px] items-center justify-center pl-[23.55px] pr-[23.56px] py-[5px] relative rounded-[14px] shrink-0" data-name="Tab">
      <div className="relative shrink-0 size-[16px]" data-name="Component 1">
        <div className="absolute inset-[8.333%]" data-name="Vector">
          <div className="absolute inset-[-5%]" style={{ "--stroke-0": "rgba(209, 213, 220, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
              <path d={svgPaths.p232fae00} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
      <Margin2 />
    </div>
  );
}

function Tablist() {
  return (
    <div className="bg-[#101828] h-[36px] relative rounded-[14px] shrink-0 w-full" data-name="Tablist">
      <div aria-hidden="true" className="absolute border border-[#1e2939] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[36px] items-center justify-center p-[5px] relative w-full">
          <Tab />
          <Tab1 />
          <Tab2 />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading 4">
      <div className="relative shrink-0 size-[20px]" data-name="Component 1">
        <div className="absolute inset-[8.323%]" data-name="Vector">
          <div className="absolute inset-[-4.999%]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
              <path d={svgPaths.p2aab280} id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-3/4 left-[83.33%] right-[16.67%] top-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-25%_-0.83px]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
              <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[83.33%] left-3/4 right-[8.33%] top-[16.67%]" data-name="Vector">
          <div className="absolute inset-[-0.83px_-25%]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 2">
              <path d="M4.16667 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-[8.33%] right-3/4 top-3/4" data-name="Vector">
          <div className="absolute inset-[-25%]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
              <path d={svgPaths.p29efb800} id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[16px] whitespace-pre">Sélection du Modèle IA</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#99a1af] text-[16px] w-full">
        <p className="leading-[24px]">Choisissez le modèle de génération</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[6px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <Heading1 />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start right-[10px] top-[10px]" data-name="Container">
      <div className="relative shrink-0 size-[16px]" data-name="Component 1">
        <div className="absolute inset-[8.333%]" data-name="Vector">
          <div className="absolute inset-[-5%]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
              <path d={svgPaths.p3d62dd80} id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[41.67%_37.5%]" data-name="Vector">
          <div className="absolute inset-[-25%_-16.67%]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 4">
              <path d={svgPaths.p207459c0} id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(246,51,154,0.1)] h-[88px] relative rounded-[10px] shrink-0 w-[308px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#f6339a] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="absolute left-1/2 size-[24px] top-[18px] translate-x-[-50%]" data-name="Component 1">
        <div className="absolute inset-[8.323%]" data-name="Vector">
          <div className="absolute inset-[-4.999%]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
              <path d={svgPaths.p259cb680} id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-3/4 left-[83.33%] right-[16.67%] top-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-25%_-1px]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
              <path d="M1 1V5" id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[83.33%] left-3/4 right-[8.33%] top-[16.67%]" data-name="Vector">
          <div className="absolute inset-[-1px_-25%]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 2">
              <path d="M5 1H1" id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-[8.33%] right-3/4 top-3/4" data-name="Vector">
          <div className="absolute inset-[-25%]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
              <path d={svgPaths.pafef4f0} id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[20px] justify-center leading-[0] left-[18px] text-[14px] text-white top-[60px] translate-y-[-50%] w-[27.664px]">
        <p className="leading-[20px]">Flux</p>
      </div>
      <Container8 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#1e2939] h-[88px] relative rounded-[10px] shrink-0 w-[308px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#364153] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="absolute left-1/2 size-[24px] top-[18px] translate-x-[-50%]" data-name="Component 1">
        <div className="absolute inset-[8.32%_12.49%]" data-name="Vector">
          <div className="absolute inset-[-5%_-5.55%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22">
              <path d={svgPaths.p16a16b40} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[20px] justify-center leading-[0] left-[18px] text-[#99a1af] text-[14px] top-[60px] translate-y-[-50%] w-[53.673px]">
        <p className="leading-[20px]">Runway</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#1e2939] h-[88px] relative rounded-[10px] shrink-0 w-[308px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#364153] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="absolute left-1/2 size-[24px] top-[18px] translate-x-[-50%]" data-name="Component 1">
        <div className="absolute inset-[8.32%_12.49%]" data-name="Vector">
          <div className="absolute inset-[-5%_-5.55%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22">
              <path d={svgPaths.p16a16b40} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[20px] justify-center leading-[0] left-[18px] text-[#99a1af] text-[14px] top-[60px] translate-y-[-50%] w-[45.478px]">
        <p className="leading-[20px]">Gen-4</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function SvgMargin() {
  return (
    <div className="box-border content-stretch flex flex-col h-[22px] items-start pb-0 pt-[2px] px-0 relative shrink-0 w-[20px]" data-name="SVG:margin">
      <div className="relative shrink-0 size-[20px]" data-name="Component 1">
        <div className="absolute inset-[8.323%]" data-name="Vector">
          <div className="absolute inset-[-4.999%]" style={{ "--stroke-0": "rgba(251, 100, 182, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
              <path d={svgPaths.p2aab280} id="Vector" stroke="var(--stroke-0, #FB64B6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-3/4 left-[83.33%] right-[16.67%] top-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-25%_-0.83px]" style={{ "--stroke-0": "rgba(251, 100, 182, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
              <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #FB64B6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[83.33%] left-3/4 right-[8.33%] top-[16.67%]" data-name="Vector">
          <div className="absolute inset-[-0.83px_-25%]" style={{ "--stroke-0": "rgba(251, 100, 182, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 2">
              <path d="M4.16667 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #FB64B6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-[8.33%] right-3/4 top-3/4" data-name="Vector">
          <div className="absolute inset-[-25%]" style={{ "--stroke-0": "rgba(251, 100, 182, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
              <path d={svgPaths.p29efb800} id="Vector" stroke="var(--stroke-0, #FB64B6)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">Flux 1.1 Pro</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#d1d5dc] text-[14px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">Text2Img ou Img2Img ultra-rapide</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pb-0 pt-[4px] px-0 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#00d3f2] text-[12px] text-nowrap">
        <p className="leading-[16px] whitespace-pre">✨ Supporte Img2Img avec 1-3 photos</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container10 />
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <SvgMargin />
      <Container13 />
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-gradient-to-r from-[#f6339a] relative rounded-[10px] shrink-0 to-[#9810fa] w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(246,51,154,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start p-[17px] relative w-full">
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[24px] pt-0 px-[24px] relative w-full">
          <Container9 />
          <BackgroundBorder1 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#101828] relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#1e2939] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-px relative w-full">
          <Container7 />
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading 4">
      <div className="relative shrink-0 size-[20px]" data-name="Component 1">
        <div className="absolute bottom-[37.5%] left-1/2 right-1/2 top-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-8.33%_-0.83px]" style={{ "--stroke-0": "rgba(43, 127, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 12">
              <path d="M0.833333 0.833333V10.8333" id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_29.17%_66.67%_29.17%]" data-name="Vector">
          <div className="absolute inset-[-20%_-10%]" style={{ "--stroke-0": "rgba(43, 127, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
              <path d={svgPaths.pbedad00} id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[62.5%_12.5%_12.5%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-16.67%_-5.56%]" style={{ "--stroke-0": "rgba(43, 127, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 7">
              <path d={svgPaths.p3e05ba00} id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[16px] whitespace-pre">Photos de Référence</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[24px] relative shrink-0 text-[#99a1af] text-[16px] w-full">
        <p className="mb-0">Uploadez 1-3 photos pour guider la</p>
        <p className="mb-0">génération (optionnel pour Gen-4 et</p>
        <p>Flux)</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[6px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <Heading2 />
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Label">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#d1d5dc] text-[14px] w-full">
        <p className="leading-[14px]">Type de Photo</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[rgba(43,127,255,0.1)] h-[72px] relative rounded-[10px] shrink-0 w-[97.33px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#2b7fff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="absolute left-[calc(50%-0.005px)] size-[24px] top-[14px] translate-x-[-50%]" data-name="Component 1">
        <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]" data-name="Vector">
          <div className="absolute inset-[-16.67%_-7.14%]" style={{ "--stroke-0": "rgba(43, 127, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 8">
              <path d={svgPaths.p11b86180} id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_33.33%_54.17%_33.33%]" data-name="Vector">
          <div className="absolute inset-[-12.5%]" style={{ "--stroke-0": "rgba(43, 127, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
              <path d={svgPaths.pb08b100} id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[16px] justify-center leading-[0] left-[14px] text-[12px] text-white top-[50px] translate-y-[-50%] w-[57.205px]">
        <p className="leading-[16px]">Headshot</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#1e2939] h-[72px] relative rounded-[10px] shrink-0 w-[97.33px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#364153] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="absolute left-[calc(50%-0.015px)] size-[24px] top-[14px] translate-x-[-50%]" data-name="Component 1">
        <div className="absolute inset-[8.34%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-5%_-5.56%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 22">
              <path d={svgPaths.paeacc80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/2 left-[13.75%] right-[13.75%] top-[29.17%]" data-name="Vector">
          <div className="absolute inset-[-20%_-5.75%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 7">
              <path d={svgPaths.p2bde6700} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-1/2" data-name="Vector">
          <div className="absolute inset-[-10%_-1px]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 12">
              <path d="M1 11V1" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[16px] justify-center leading-[0] left-[14px] text-[#99a1af] text-[12px] top-[50px] translate-y-[-50%] w-[34.032px]">
        <p className="leading-[16px]">Objet</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#1e2939] h-[72px] relative rounded-[10px] shrink-0 w-[97.34px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#364153] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="absolute left-1/2 size-[24px] top-[14px] translate-x-[-50%]" data-name="Component 1">
        <div className="absolute inset-[12.5%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-5.56%_-5%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 20">
              <path d={svgPaths.p3dba7c00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold h-[16px] justify-center leading-[0] left-[14px] text-[#99a1af] text-[12px] top-[50px] translate-y-[-50%] w-[42.168px]">
        <p className="leading-[16px]">Décors</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Container18 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[26px] right-[26px] top-[66px]" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white">
        <p className="leading-[20px] whitespace-pre">Cliquer pour ajouter une photo</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[26px] right-[26px] top-[90px]" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6a7282] text-[12px] text-center text-nowrap">
        <p className="leading-[16px] whitespace-pre">{`PNG, JPG jusqu'à 10MB (0/3)`}</p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="bg-[#1e2939] h-[132px] relative rounded-[10px] shrink-0 w-full" data-name="Label">
      <div aria-hidden="true" className="absolute border-2 border-[#364153] border-dashed inset-0 pointer-events-none rounded-[10px]" />
      <div className="absolute left-1/2 size-[32px] top-[26px] translate-x-[-50%]" data-name="Component 1">
        <div className="absolute bottom-[37.5%] left-1/2 right-1/2 top-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-8.33%_-1.33px]" style={{ "--stroke-0": "rgba(106, 114, 130, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 19">
              <path d="M1.33333 1.33333V17.3333" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_29.17%_66.67%_29.17%]" data-name="Vector">
          <div className="absolute inset-[-20%_-10%]" style={{ "--stroke-0": "rgba(106, 114, 130, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 10">
              <path d={svgPaths.p1e4b7940} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[62.5%_12.5%_12.5%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-16.67%_-5.56%]" style={{ "--stroke-0": "rgba(106, 114, 130, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 11">
              <path d={svgPaths.p16d3e580} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            </svg>
          </div>
        </div>
      </div>
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[45px] right-[17px] top-[13px]" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[16px] relative shrink-0 text-[#d1d5dc] text-[12px] text-nowrap whitespace-pre">
        <p className="mb-0">Mode Text2Img : Génération sans photo</p>
        <p>{`d'entrée`}</p>
      </div>
    </div>
  );
}

function Alert() {
  return (
    <div className="bg-[rgba(43,127,255,0.1)] h-[58px] relative rounded-[10px] shrink-0 w-full" data-name="Alert">
      <div aria-hidden="true" className="absolute border border-[rgba(43,127,255,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="absolute left-[17px] size-[16px] top-[15px]" data-name="Component 1">
        <div className="absolute inset-[8.333%]" data-name="Vector">
          <div className="absolute inset-[-5%]" style={{ "--stroke-0": "rgba(10, 10, 10, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
              <path d={svgPaths.p3d62dd80} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/2 left-1/2 right-1/2 top-[33.33%]" data-name="Vector">
          <div className="absolute inset-[-25%_-0.67px]" style={{ "--stroke-0": "rgba(10, 10, 10, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
              <path d="M0.666667 0.666667V3.33333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[33.33%] left-1/2 right-[49.96%] top-[66.67%]" data-name="Vector">
          <div className="absolute inset-[-0.667px]" style={{ "--stroke-0": "rgba(10, 10, 10, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
              <path d="M0.666667 0.666667H0.673334" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
      <Container22 />
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[24px] pt-0 px-[24px] relative w-full">
          <Container19 />
          <Label1 />
          <Alert />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-[#101828] relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#1e2939] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-px relative w-full">
          <Container17 />
          <Container23 />
        </div>
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading 4">
      <div className="relative shrink-0 size-[20px]" data-name="Component 1">
        <div className="absolute inset-[8.34%_8.32%_8.32%_8.34%]" data-name="Vector">
          <div className="absolute inset-[-5%]" style={{ "--stroke-0": "rgba(194, 122, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
              <path d={svgPaths.p18641b00} id="Vector" stroke="var(--stroke-0, #C27AFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[29.17%_29.17%_58.33%_58.33%]" data-name="Vector">
          <div className="absolute inset-[-33.333%]" style={{ "--stroke-0": "rgba(194, 122, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
              <path d={svgPaths.p2dbabc00} id="Vector" stroke="var(--stroke-0, #C27AFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[58.33%] left-[20.83%] right-[79.17%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-25%_-0.83px]" style={{ "--stroke-0": "rgba(194, 122, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
              <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #C27AFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/4 left-[79.17%] right-[20.83%] top-[58.33%]" data-name="Vector">
          <div className="absolute inset-[-25%_-0.83px]" style={{ "--stroke-0": "rgba(194, 122, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
              <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #C27AFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[8.33%_58.33%_83.33%_41.67%]" data-name="Vector">
          <div className="absolute inset-[-50%_-0.83px]" style={{ "--stroke-0": "rgba(194, 122, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
              <path d="M0.833333 0.833333V2.5" id="Vector" stroke="var(--stroke-0, #C27AFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[33.33%_70.83%_66.67%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-0.83px_-25%]" style={{ "--stroke-0": "rgba(194, 122, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 2">
              <path d="M4.16667 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #C27AFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[66.67%_12.5%_33.33%_70.83%]" data-name="Vector">
          <div className="absolute inset-[-0.83px_-25%]" style={{ "--stroke-0": "rgba(194, 122, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 2">
              <path d="M4.16667 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #C27AFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_54.17%_87.5%_37.5%]" data-name="Vector">
          <div className="absolute inset-[-0.83px_-50%]" style={{ "--stroke-0": "rgba(194, 122, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
              <path d="M2.5 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #C27AFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[16px] whitespace-pre">Quick Prompts Universels</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[24px] relative shrink-0 text-[#d1d5dc] text-[16px] w-full">
        <p className="mb-0">Prompts professionnels qui</p>
        <p className="mb-0">fonctionnent avec tous les modèles</p>
        <p>(avec ou sans photos)</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[6px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <Heading3 />
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(54,65,83,0.5)] box-border content-stretch flex flex-col items-start p-[8px] relative rounded-[10px] shrink-0" data-name="Overlay">
      <div className="relative shrink-0 size-[16px]" data-name="Component 1">
        <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]" data-name="Vector">
          <div className="absolute inset-[-16.67%_-7.14%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 6">
              <path d={svgPaths.p352c6500} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_33.33%_54.17%_33.33%]" data-name="Vector">
          <div className="absolute inset-[-12.5%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
              <path d={svgPaths.p31080000} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-white w-full">
        <p className="leading-[20px]">Studio Pro</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] w-full">
        <p className="mb-0">Portrait pro style LinkedIn - fonctionne</p>
        <p>avec ou sans photo</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Container">
      <Overlay />
      <Container28 />
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[rgba(30,41,57,0.5)] box-border content-stretch flex flex-col items-start p-[13px] relative rounded-[10px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container29 />
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(54,65,83,0.5)] box-border content-stretch flex flex-col items-start p-[8px] relative rounded-[10px] shrink-0" data-name="Overlay">
      <div className="relative shrink-0 size-[16px]" data-name="Component 1">
        <div className="absolute inset-[8.323%]" data-name="Vector">
          <div className="absolute inset-[-5%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
              <path d={svgPaths.p6a5a100} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-3/4 left-[83.33%] right-[16.67%] top-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-25%_-0.67px]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
              <path d="M0.666667 0.666667V3.33333" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[83.33%] left-3/4 right-[8.33%] top-[16.67%]" data-name="Vector">
          <div className="absolute inset-[-0.67px_-25%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
              <path d="M3.33333 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-[8.33%] right-3/4 top-3/4" data-name="Vector">
          <div className="absolute inset-[-25%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
              <path d={svgPaths.p2b1c1400} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-white w-full">
        <p className="leading-[20px]">Lifestyle</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#99a1af] text-[12px] w-full">
        <p className="leading-[16px]">Ambiance lifestyle naturelle en extérieur</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Container">
      <Overlay1 />
      <Container32 />
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[rgba(30,41,57,0.5)] box-border content-stretch flex flex-col items-start p-[13px] relative rounded-[10px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container33 />
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(54,65,83,0.5)] box-border content-stretch flex flex-col items-start p-[8px] relative rounded-[10px] shrink-0" data-name="Overlay">
      <div className="relative shrink-0 size-[16px]" data-name="Component 1">
        <div className="absolute inset-[8.33%_33.33%_16.67%_33.33%]" data-name="Vector">
          <div className="absolute inset-[-5.56%_-12.5%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 14">
              <path d={svgPaths.p27fd8a00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[16.67%] left-[8.33%] right-[8.33%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-7.14%_-5%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 11">
              <path d={svgPaths.pb5eef70} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-white w-full">
        <p className="leading-[20px]">Executive</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] w-full">
        <p className="mb-0">Look exécutif ultra-professionnel en salle</p>
        <p>de réunion</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Container">
      <Overlay2 />
      <Container36 />
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[rgba(30,41,57,0.5)] box-border content-stretch flex flex-col items-start p-[13px] relative rounded-[10px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container37 />
    </div>
  );
}

function Overlay3() {
  return (
    <div className="bg-[rgba(54,65,83,0.5)] box-border content-stretch flex flex-col items-start p-[8px] relative rounded-[10px] shrink-0" data-name="Overlay">
      <div className="relative shrink-0 size-[16px]" data-name="Component 1">
        <div className="absolute inset-[16.67%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-6.25%_-5%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 12">
              <path d={svgPaths.p37a86d00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[41.67%_37.5%_33.33%_37.5%]" data-name="Vector">
          <div className="absolute inset-[-16.667%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
              <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-white w-full">
        <p className="leading-[20px]">Fashion</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#99a1af] text-[12px] w-full">
        <p className="leading-[16px]">Style editorial mode haut de gamme</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container38 />
      <Container39 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Container">
      <Overlay3 />
      <Container40 />
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[rgba(30,41,57,0.5)] box-border content-stretch flex flex-col items-start p-[13px] relative rounded-[10px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container41 />
    </div>
  );
}

function Overlay4() {
  return (
    <div className="bg-[rgba(54,65,83,0.5)] box-border content-stretch flex flex-col items-start p-[8px] relative rounded-[10px] shrink-0" data-name="Overlay">
      <div className="relative shrink-0 size-[16px]" data-name="Component 1">
        <div className="absolute inset-[16.6%_8.33%_12.5%_8.33%]" data-name="Vector">
          <div className="absolute inset-[-5.88%_-5%]" style={{ "--stroke-0": "rgba(153, 161, 175, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 13">
              <path d={svgPaths.p3d330d70} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-white w-full">
        <p className="leading-[20px]">Dating Pro</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#99a1af] text-[12px] w-full">
        <p className="leading-[16px]">Photo optimisée pour apps de rencontre</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[2px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Container">
      <Overlay4 />
      <Container44 />
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-[rgba(30,41,57,0.5)] box-border content-stretch flex flex-col items-start p-[13px] relative rounded-[10px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container45 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[45px] right-[17px] top-[13px]" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[16px] relative shrink-0 text-[#d1d5dc] text-[12px] text-nowrap whitespace-pre">
        <p className="mb-0">✨ Ces prompts sont universels et</p>
        <p className="mb-0">{`s'adaptent automatiquement au mode`}</p>
        <p className="mb-0">Text2Img ou Img2Img selon que vous</p>
        <p>uploadez des photos ou non.</p>
      </div>
    </div>
  );
}

function Alert1() {
  return (
    <div className="bg-gradient-to-r from-[rgba(173,70,255,0.1)] h-[90px] relative rounded-[10px] shrink-0 to-[rgba(246,51,154,0.1)] w-full" data-name="Alert">
      <div aria-hidden="true" className="absolute border border-[rgba(173,70,255,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="absolute left-[17px] size-[16px] top-[15px]" data-name="Component 1">
        <div className="absolute inset-[8.34%_8.32%_8.32%_8.34%]" data-name="Vector">
          <div className="absolute inset-[-5%]" style={{ "--stroke-0": "rgba(10, 10, 10, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
              <path d={svgPaths.p2dc96571} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[29.17%_29.17%_58.33%_58.33%]" data-name="Vector">
          <div className="absolute inset-[-33.333%]" style={{ "--stroke-0": "rgba(10, 10, 10, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
              <path d={svgPaths.p2ffa8980} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[58.33%] left-[20.83%] right-[79.17%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-25%_-0.67px]" style={{ "--stroke-0": "rgba(10, 10, 10, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
              <path d="M0.666667 0.666667V3.33333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/4 left-[79.17%] right-[20.83%] top-[58.33%]" data-name="Vector">
          <div className="absolute inset-[-25%_-0.67px]" style={{ "--stroke-0": "rgba(10, 10, 10, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
              <path d="M0.666667 0.666667V3.33333" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[8.33%_58.33%_83.33%_41.67%]" data-name="Vector">
          <div className="absolute inset-[-50%_-0.67px]" style={{ "--stroke-0": "rgba(10, 10, 10, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 3">
              <path d="M0.666667 0.666667V2" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[33.33%_70.83%_66.67%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-0.67px_-25%]" style={{ "--stroke-0": "rgba(10, 10, 10, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
              <path d="M3.33333 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[66.67%_12.5%_33.33%_70.83%]" data-name="Vector">
          <div className="absolute inset-[-0.67px_-25%]" style={{ "--stroke-0": "rgba(10, 10, 10, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
              <path d="M3.33333 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_54.17%_87.5%_37.5%]" data-name="Vector">
          <div className="absolute inset-[-0.67px_-50%]" style={{ "--stroke-0": "rgba(10, 10, 10, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 2">
              <path d="M2 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
      <Container47 />
    </div>
  );
}

function Container48() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start pb-[24px] pt-0 px-[24px] relative w-full">
          <Container46 />
          <Alert1 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(130,0,219,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-px relative w-full">
          <Container25 />
          <Container48 />
        </div>
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Heading 4">
      <div className="relative shrink-0 size-[20px]" data-name="Component 1">
        <div className="absolute inset-[33.33%_41.67%_66.67%_41.67%]" data-name="Vector">
          <div className="absolute inset-[-0.83px_-25%]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 2">
              <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[12.5%] left-1/2 right-1/2 top-1/2" data-name="Vector">
          <div className="absolute inset-[-11.11%_-0.83px]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 10">
              <path d="M0.833333 8.33333V0.833333" id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[66.67%] left-1/2 right-1/2 top-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-20%_-0.83px]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
              <path d="M0.833333 5V0.833333" id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[66.67%_12.5%_33.33%_70.83%]" data-name="Vector">
          <div className="absolute inset-[-0.83px_-25%]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 2">
              <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/2 left-[79.17%] right-[20.83%] top-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-11.11%_-0.83px]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 10">
              <path d="M0.833333 8.33333V0.833333" id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[66.67%_20.83%_12.5%_79.17%]" data-name="Vector">
          <div className="absolute inset-[-20%_-0.83px]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 6">
              <path d="M0.833333 5V0.833333" id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[58.33%_70.83%_41.67%_12.5%]" data-name="Vector">
          <div className="absolute inset-[-0.83px_-25%]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 2">
              <path d="M0.833333 0.833333H4.16667" id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[12.5%_79.17%_58.33%_20.83%]" data-name="Vector">
          <div className="absolute inset-[-14.29%_-0.83px]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 8">
              <path d="M0.833333 6.66667V0.833333" id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[58.33%_79.17%_12.5%_20.83%]" data-name="Vector">
          <div className="absolute inset-[-14.29%_-0.83px]" style={{ "--stroke-0": "rgba(246, 51, 154, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 8">
              <path d="M0.833333 6.66667V0.833333" id="Vector" stroke="var(--stroke-0, #F6339A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[16px] whitespace-pre">Paramètres de Génération</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#99a1af] text-[16px] w-full">
        <p className="leading-[24px]">{`Configurez votre génération d'image`}</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[6px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <Heading4 />
          <Container49 />
        </div>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <div className="basis-0 flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#d1d5dc] text-[14px]">
        <p className="leading-[14px]">Prompt *</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute bottom-[43px] box-border content-stretch flex flex-col items-start left-[13px] pl-0 pr-[44.78px] py-0 top-[9px]" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[24px] relative shrink-0 text-[#6a7282] text-[16px] text-nowrap whitespace-pre">
        <p className="mb-0">{`Ex: professional portrait, studio `}</p>
        <p>lighting, 85mm lens</p>
      </div>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-[#1e2939] h-[100px] min-h-[100px] relative rounded-[8px] shrink-0 w-full" data-name="Textarea">
      <div className="h-[100px] overflow-auto relative w-full">
        <Container52 />
        <div className="absolute bottom-[67px] left-[13px] top-[9px] w-[282px]" data-name="Rectangle" />
      </div>
      <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container51 />
      <Textarea />
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Label">
      <div className="basis-0 flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#d1d5dc] text-[14px]">
        <p className="leading-[14px]">Negative Prompt (optionnel)</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute bottom-[9px] box-border content-stretch flex flex-col items-start left-[13px] pl-0 pr-[64.44px] py-0 top-[9px]" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[24px] relative shrink-0 text-[#6a7282] text-[16px] text-nowrap whitespace-pre">
        <p className="mb-0">{`Ex: low quality, blur, artifacts, `}</p>
        <p>distorted face</p>
      </div>
    </div>
  );
}

function Textarea1() {
  return (
    <div className="bg-[#1e2939] h-[66px] min-h-[60px] relative rounded-[8px] shrink-0 w-full" data-name="Textarea">
      <div className="h-[66px] overflow-auto relative w-full">
        <Container54 />
        <div className="absolute bottom-[33px] left-[13px] top-[9px] w-[282px]" data-name="Rectangle" />
      </div>
      <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Textarea1 />
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Label">
      <div className="basis-0 flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#d1d5dc] text-[14px]">
        <p className="leading-[14px]">Aspect Ratio</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white">
        <p className="leading-[20px] whitespace-pre">1:1 (Carré)</p>
      </div>
    </div>
  );
}

function Combobox() {
  return (
    <div className="bg-[#1e2939] h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Combobox">
      <div aria-hidden="true" className="absolute border border-[#364153] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[36px] items-center justify-between px-[13px] py-[9px] relative w-full">
          <Container56 />
          <div className="opacity-50 relative shrink-0 size-[16px]" data-name="Component 1">
            <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
              <div className="absolute inset-[-16.67%_-8.33%]" style={{ "--stroke-0": "rgba(113, 113, 130, 1)" } as React.CSSProperties}>
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
                  <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Label3 />
      <Combobox />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Container">
      <div className="relative shrink-0 size-[14px]" data-name="Component 1">
        <div className="absolute bottom-[29.17%] left-[16.67%] right-[16.67%] top-1/4" data-name="Vector">
          <div className="absolute inset-[-9.09%_-6.25%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 8">
              <path d={svgPaths.p3db88f00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Checkbox() {
  return (
    <div className="bg-[#030213] box-border content-stretch flex flex-col items-start p-px relative rounded-[4px] shrink-0 size-[16px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#030213] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
      <Container58 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Label">
      <div className="basis-0 flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[14px] text-white">
        <p className="leading-[14px]">Mode Test (gratuit)</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[16px] relative shrink-0 text-[#99a1af] text-[12px] w-full">
        <p className="mb-0">Ne débite pas de crédits - Pour tester</p>
        <p>uniquement</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[4px] grow items-start min-h-px min-w-px relative shrink-0" data-name="Container">
      <Label4 />
      <Container59 />
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(43,127,255,0.1)] relative rounded-[10px] shrink-0 w-full" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(43,127,255,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center p-[17px] relative w-full">
          <Checkbox />
          <Container60 />
        </div>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 size-[16px]" data-name="SVG">
      <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[16px]" data-name="Component 1">
        <div className="absolute inset-[8.323%]" data-name="Vector">
          <div className="absolute inset-[-5%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
              <path d={svgPaths.p6a5a100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-3/4 left-[83.33%] right-[16.67%] top-[8.33%]" data-name="Vector">
          <div className="absolute inset-[-25%_-0.67px]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
              <path d="M0.666667 0.666667V3.33333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[83.33%] left-3/4 right-[8.33%] top-[16.67%]" data-name="Vector">
          <div className="absolute inset-[-0.67px_-25%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
              <path d="M3.33333 0.666667H0.666667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[8.33%] left-[8.33%] right-3/4 top-3/4" data-name="Vector">
          <div className="absolute inset-[-25%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
              <path d={svgPaths.p2b1c1400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function SvgMargin1() {
  return (
    <div className="box-border content-stretch flex flex-col h-[16px] items-start pl-0 pr-[8px] py-0 relative shrink-0 w-[24px]" data-name="SVG:margin">
      <Svg />
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-gradient-to-r from-[#f6339a] h-[40px] opacity-50 relative rounded-[8px] shrink-0 to-[#9810fa] w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[40px] items-center justify-center px-[16px] py-0 relative w-full">
          <SvgMargin1 />
          <div className="flex flex-col font-['Plus_Jakarta_Sans:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-center text-nowrap text-white">
            <p className="leading-[20px] whitespace-pre">Générer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start pb-[24px] pt-0 px-[24px] relative w-full">
          <Container53 />
          <Container55 />
          <Container57 />
          <OverlayBorder />
          <Button12 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="bg-[#101828] relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#1e2939] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-px relative w-full">
          <Container50 />
          <Container61 />
        </div>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder2 />
      <BackgroundBorder3 />
      <BackgroundBorder4 />
      <BackgroundBorder5 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-white w-full">
        <p className="leading-[16px]">Image Générée</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-[6px] pt-[24px] px-[24px] relative w-full">
          <Heading5 />
        </div>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6a7282] text-[16px] text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">Aucune image générée</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0" data-name="Container">
      <div className="relative shrink-0 size-[48px]" data-name="Component 1">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <div className="absolute inset-[-5.556%]" style={{ "--stroke-0": "rgba(74, 85, 101, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
              <path d={svgPaths.pfcf7c00} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[29.17%_54.17%_54.17%_29.17%]" data-name="Vector">
          <div className="absolute inset-[-25%]" style={{ "--stroke-0": "rgba(74, 85, 101, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <path d={svgPaths.p335f3460} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[12.5%] left-1/4 right-[12.5%] top-[47.2%]" data-name="Vector">
          <div className="absolute inset-[-10.34%_-6.67%]" style={{ "--stroke-0": "rgba(74, 85, 101, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 24">
              <path d={svgPaths.p3d496700} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
            </svg>
          </div>
        </div>
      </div>
      <Container64 />
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="bg-[#1e2939] relative rounded-[10px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#364153] border-dashed inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex items-center justify-center px-[2px] py-[112px] relative w-full">
          <Container65 />
        </div>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-[24px] pt-0 px-[24px] relative w-full">
          <BackgroundBorder6 />
        </div>
      </div>
    </div>
  );
}

function BackgroundBorder7() {
  return (
    <div className="bg-[#101828] relative rounded-[14px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#1e2939] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] items-start p-px relative w-full">
          <Container63 />
          <Container66 />
        </div>
      </div>
    </div>
  );
}

function Tabpanel() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Tabpanel">
      <Container62 />
      <BackgroundBorder7 />
    </div>
  );
}

function TabpanelMargin() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-start min-h-px min-w-px pb-0 pt-[24px] px-0 relative shrink-0 w-full" data-name="Tabpanel:margin">
      <Tabpanel />
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[16px] right-[16px] top-[248px]" data-name="Container">
      <Tablist />
      <TabpanelMargin />
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-nowrap text-white">
        <p className="leading-[24px] whitespace-pre">P</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-gradient-to-r content-stretch flex from-[#f6339a] items-center justify-center relative rounded-[10px] shrink-0 size-[32px] to-[#9810fa]" data-name="Background">
      <Container68 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="box-border content-stretch flex flex-col h-[32px] items-start pl-0 pr-[8px] py-0 relative shrink-0 w-[40px]" data-name="Margin">
      <Background />
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20px] text-nowrap text-white">
        <p className="leading-[28px] whitespace-pre">PhotoGlow</p>
      </div>
    </div>
  );
}

function ButtonGoToHomePage() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Button - Go to home page">
      <Margin3 />
      <Container69 />
    </div>
  );
}

function ButtonDialog() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[36px]" data-name="Button dialog">
      <div className="relative shrink-0 size-[16px]" data-name="Component 1">
        <div className="absolute inset-[20.83%_16.67%_79.17%_16.67%]" data-name="Vector">
          <div className="absolute inset-[-0.67px_-6.25%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 2">
              <path d="M0.666667 0.666667H11.3333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/2 left-[16.67%] right-[16.67%] top-1/2" data-name="Vector">
          <div className="absolute inset-[-0.67px_-6.25%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 2">
              <path d="M0.666667 0.666667H11.3333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
        <div className="absolute inset-[79.17%_16.67%_20.83%_16.67%]" data-name="Vector">
          <div className="absolute inset-[-0.67px_-6.25%]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 2">
              <path d="M0.666667 0.666667H11.3333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <ButtonDialog />
    </div>
  );
}

function Header() {
  return (
    <div className="backdrop-blur-md backdrop-filter bg-[rgba(0,0,0,0.9)] box-border content-stretch flex items-center justify-between pb-[11px] pointer-events-auto pt-[10px] px-[16px] sticky top-0" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(173,70,255,0.2)] border-solid inset-0 pointer-events-none shadow-[0px_4px_24px_0px_rgba(147,51,234,0.1)]" />
      <ButtonGoToHomePage />
      <Container70 />
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute bg-black h-[3104px] left-0 right-0 top-0" data-name="Background">
      <BackgroundHorizontalBorder />
      <Container67 />
      <div className="absolute inset-0 pointer-events-none">
        <Header />
      </div>
    </div>
  );
}

export default function Component390WDefault() {
  return (
    <div className="bg-white relative size-full" data-name="390w default">
      <Background1 />
    </div>
  );
}