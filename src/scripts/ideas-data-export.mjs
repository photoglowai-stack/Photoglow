/**
 * Export des données d'idées en JSON pur
 * Ce fichier est utilisé par generate.mjs
 */

export const photoIdeas = [
  // Holidays & Events
  { title: "Halloween", description: "Get into the spooky spirit with our Halloween photo collection. Perfect for creating eerie, atmospheric portraits with dramatic lighting, costume elements, and a touch of mystery", category: "Holidays & Events", slug: "halloween" },
  { title: "Diwali", description: "Celebrate the Festival of Lights with vibrant, culturally rich portraits featuring traditional attire, diyas, and warm golden lighting that captures the essence of this beautiful celebration", category: "Holidays & Events", slug: "diwali" },
  { title: "Day Of The Dead (Día De Los Muertos)", description: "Celebrate Día de los Muertos with this beautiful photo collection. Capture the vibrant colors, rich traditions, and spiritual essence of this sacred Mexican holiday with elegant portraits featuring sugar skulls, marigolds, and traditional face painting", category: "Holidays & Events", slug: "day-of-the-dead-dia-de-los-muertos" },
  { title: "Christmas", description: "Capture the magic and warmth of the holiday season with festive Christmas portraits featuring cozy winter aesthetics, twinkling lights, and joyful seasonal elements", category: "Holidays & Events", slug: "christmas" },
  { title: "Valentine's Day", description: "Create romantic and enchanting portraits perfect for Valentine's Day, featuring soft lighting, elegant styling, and heartfelt expressions of love and connection", category: "Holidays & Events", slug: "valentines-day" },
  { title: "New Year's Eve", description: "Ring in the new year with glamorous, celebratory portraits featuring elegant attire, festive elements, and an atmosphere of excitement and new beginnings", category: "Holidays & Events", slug: "new-years-eve" },
  { title: "Easter", description: "Hop into spring with fresh, cheerful Easter portraits featuring pastel colors, floral elements, and the renewal of the season", category: "Holidays & Events", slug: "easter" },
  { title: "Holi", description: "Embrace the vibrant Festival of Colors with dynamic portraits featuring brilliant color powders, joyful expressions, and the celebratory spirit of spring", category: "Holidays & Events", slug: "holi" },
  { title: "Ramadan", description: "Honor the holy month with respectful, culturally sensitive portraits that capture the spiritual essence, reflection, and community aspects of Ramadan", category: "Holidays & Events", slug: "ramadan" },
  { title: "Hanukkah", description: "Celebrate the Festival of Lights with meaningful portraits featuring menorah lighting, traditional elements, and the warmth of family gatherings", category: "Holidays & Events", slug: "hanukkah" },
  { title: "Eid Mubarak", description: "Mark the joyous celebration with elegant portraits featuring traditional attire, festive decorations, and the spirit of community and gratitude", category: "Holidays & Events", slug: "eid-mubarak" },
  { title: "Chinese New Year", description: "Welcome prosperity and good fortune with vibrant portraits featuring traditional red and gold colors, festive decorations, and cultural celebrations", category: "Holidays & Events", slug: "chinese-new-year" },
  
  // Dating & Social
  { title: "Tinder", description: "Look your best on Tinder. Create professional, attention-grabbing profile photos that highlight your personality and increase your matches with authentic, engaging portraits", category: "Dating & Social", slug: "tinder" },
  { title: "Instagram", description: "Take engaging Instagram photos with our AI photo generator. Whether it's lifestyle content, portraits, or creative shoots, get Instagram-worthy images that boost your social media presence", category: "Dating & Social", slug: "instagram" },
  { title: "Hinge", description: "Hinge is designed to be deleted, and great profile photos help make that happen. Create authentic, conversation-starting images that showcase your true self", category: "Dating & Social", slug: "hinge" },
  { title: "AI Dating", description: "Stand out in the world of online dating with AI-generated photos that capture your best angles and personality. Perfect for any dating platform", category: "Dating & Social", slug: "ai-dating" },
  { title: "Dating Headshots", description: "Professional dating headshots that combine approachability with attractiveness. Get photos that make a great first impression", category: "Dating & Social", slug: "dating-headshots" },
  { title: "Bumble", description: "Make the first move count with standout Bumble photos. Create images that are both attractive and authentic, helping you start meaningful conversations", category: "Dating & Social", slug: "bumble" },
  { title: "Badoo", description: "Create eye-catching Badoo profile photos that help you connect with people nearby. Stand out with professional, engaging images", category: "Dating & Social", slug: "badoo" },
  
  // Professional Headshots
  { title: "LinkedIn Headshots", description: "Your LinkedIn headshot is often your first professional impression. Create a polished, confident portrait that reflects your expertise and helps you stand out to recruiters and connections", category: "Professional Headshots", slug: "linkedin-headshots" },
  { title: "CEO Headshots", description: "Project authority and vision with executive portraits that command respect. Perfect for C-suite professionals, board members, and business leaders", category: "Professional Headshots", slug: "ceo-headshots" },
  { title: "Startup Founder Headshots", description: "Capture the innovative spirit and determination of startup culture. Professional yet approachable headshots for entrepreneurs and founders", category: "Professional Headshots", slug: "startup-founder-headshots" },
  { title: "Model Headshots", description: "Versatile modeling headshots that showcase your unique look and range. Perfect for agency submissions, casting calls, and portfolio building", category: "Professional Headshots", slug: "model-headshots" },
  { title: "Actor Headshots", description: "Capture your essence with professional acting headshots. Showcase your range, personality, and castability for auditions and agency representation", category: "Professional Headshots", slug: "actor-headshots" },
  { title: "Comedian Headshots", description: "Let your personality shine with headshots that capture your comedic energy and approachability. Perfect for press kits, show promotions, and agent submissions", category: "Professional Headshots", slug: "comedian-headshots" },
  { title: "Life Coach Headshots", description: "Project warmth, confidence, and approachability with headshots that inspire trust. Perfect for life coaches, wellness professionals, and motivational speakers", category: "Professional Headshots", slug: "life-coach-headshots" },
  { title: "Doctor Headshots", description: "Professional medical headshots that convey expertise, trust, and compassion. Perfect for hospital websites, medical directories, and practice marketing", category: "Professional Headshots", slug: "doctor-headshots" },
  { title: "Lawyer Headshots", description: "Convey professionalism and trustworthiness with legal headshots that inspire confidence in potential clients", category: "Professional Headshots", slug: "lawyer-headshots" },
  { title: "Therapist Headshots", description: "Create approachable, warm headshots that help potential clients feel comfortable reaching out for support", category: "Professional Headshots", slug: "therapist-headshots" },
  { title: "Teacher Headshots", description: "Friendly, professional headshots for educators that convey approachability and expertise", category: "Professional Headshots", slug: "teacher-headshots" },
  { title: "Real Estate Agent Headshots", description: "Stand out in the competitive real estate market with professional headshots that build trust with potential clients", category: "Professional Headshots", slug: "real-estate-agent-headshots" },
  { title: "Keynote Speaker Headshots", description: "Command the stage with powerful speaker headshots that showcase your authority and charisma", category: "Professional Headshots", slug: "keynote-speaker-headshots" },
  { title: "Author Headshots", description: "Professional author photos for book covers, press releases, and promotional materials", category: "Professional Headshots", slug: "author-headshots" },
  { title: "Corporate Headshots For Your Team", description: "Consistent, professional team headshots that strengthen your company's brand identity", category: "Professional Headshots", slug: "corporate-headshots-for-your-team" },
  { title: "Startup Headshots For Your Team", description: "Modern, energetic team photos that capture your startup's innovative culture", category: "Professional Headshots", slug: "startup-headshots-for-your-team" },
  { title: "Professional Headshots", description: "Versatile professional headshots suitable for any industry or purpose", category: "Professional Headshots", slug: "professional-headshots" },
  
  // AI & Creative
  { title: "AI Selfies", description: "Transform your selfies with AI enhancement. Create stunning, professional-quality self-portraits with perfect lighting and composition", category: "AI & Creative", slug: "ai-selfies" },
  { title: "AI Photography", description: "Experience the future of photography with AI-generated images that push creative boundaries", category: "AI & Creative", slug: "ai-photography" },
  { title: "AI Influencer Generator", description: "Create compelling influencer-style content with AI. Perfect for social media marketing and brand building", category: "AI & Creative", slug: "ai-influencer-generator" },
  { title: "AI Makeup Try-On", description: "Experiment with different makeup looks virtually. See how various styles complement your features", category: "AI & Creative", slug: "ai-makeup-try-on" },
  { title: "AI Thumbnail Tool", description: "Create eye-catching YouTube and video thumbnails that drive clicks and engagement", category: "AI & Creative", slug: "ai-thumbnail-tool" },
  { title: "YouTube Thumbnail Reaction Face Generator", description: "Generate expressive reaction faces perfect for YouTube thumbnails that capture attention", category: "AI & Creative", slug: "youtube-thumbnail-reaction-face-generator" },
  { title: "AI Tarot Card Generator", description: "Create mystical, artistic tarot card designs with AI. Perfect for spiritual content and readings", category: "AI & Creative", slug: "ai-tarot-card-generator" },
  { title: "AI Furry Generator", description: "Generate creative furry character art and portraits with detailed, professional quality", category: "AI & Creative", slug: "ai-furry-generator" },
  { title: "Photo To Anime Converter", description: "Transform your photos into stunning anime-style artwork with AI", category: "AI & Creative", slug: "photo-to-anime-converter" },
  { title: "Virtual Suits Try-On", description: "See how you look in different professional attire virtually before making a purchase", category: "AI & Creative", slug: "virtual-suits-try-on" },
  { title: "Chibi Character Creator", description: "Create adorable chibi-style character art from your photos", category: "AI & Creative", slug: "chibi-character-creator" },
  { title: "Avatar AI", description: "Generate unique digital avatars for gaming, social media, and virtual worlds", category: "AI & Creative", slug: "avatar-ai" },
  { title: "AI Art Generator", description: "Create original artwork and creative portraits with AI assistance", category: "AI & Creative", slug: "ai-art-generator" },
  { title: "AI Tattoo Generator", description: "Design custom tattoos with AI. Visualize your ink before committing", category: "AI & Creative", slug: "ai-tattoo-generator" },
  
  // Lifestyle & Travel
  { title: "Old Money", description: "Embody timeless elegance with old money aesthetic portraits featuring classic styling and refined sophistication", category: "Lifestyle & Travel", slug: "old-money" },
  { title: "Luxury Lifestyle", description: "Capture the essence of luxury living with high-end, aspirational lifestyle photography", category: "Lifestyle & Travel", slug: "luxury-lifestyle" },
  { title: "Beach Bikini", description: "Sun-kissed beach portraits that capture the carefree spirit of summer", category: "Lifestyle & Travel", slug: "beach-bikini" },
  { title: "Dubai Influencer", description: "Capture the glamorous Dubai lifestyle with luxury settings and high-fashion aesthetics", category: "Lifestyle & Travel", slug: "dubai-influencer" },
  { title: "Bali Influencer", description: "Embrace the tropical paradise aesthetic with Bali-inspired lifestyle content", category: "Lifestyle & Travel", slug: "bali-influencer" },
  { title: "Santorini Summer", description: "Greek island paradise vibes with stunning Mediterranean backdrops", category: "Lifestyle & Travel", slug: "santorini-summer" },
  { title: "Mykonos Nights", description: "Capture the vibrant nightlife and luxury of the Greek islands", category: "Lifestyle & Travel", slug: "mykonos-nights" },
  { title: "Summer In Paris", description: "Romantic Parisian summer aesthetics with iconic cityscapes", category: "Lifestyle & Travel", slug: "summer-in-paris" },
  { title: "Nature", description: "Connect with the natural world through authentic outdoor portraits", category: "Lifestyle & Travel", slug: "nature" },
  { title: "Outdoor Adventure", description: "Capture the thrill of outdoor exploration and adventure sports", category: "Lifestyle & Travel", slug: "outdoor-adventure" },
  
  // Fashion & Style
  { title: "Glamour", description: "High-fashion glamour shots with dramatic lighting and styling", category: "Fashion & Style", slug: "glamour" },
  { title: "Street Style", description: "Urban fashion photography that captures contemporary style trends", category: "Fashion & Style", slug: "street-style" },
  { title: "Mob Wife", description: "Bold, luxurious aesthetic inspired by mob wife fashion trends", category: "Fashion & Style", slug: "mob-wife" },
  { title: "Instant Camera", description: "Nostalgic instant camera aesthetic with authentic vintage vibes", category: "Fashion & Style", slug: "instant-camera" },
  { title: "Gorpcore", description: "Outdoor-inspired fashion meets urban styling", category: "Fashion & Style", slug: "gorpcore" },
  { title: "Y2K Aesthetic", description: "Early 2000s fashion nostalgia with bold colors and playful styling", category: "Fashion & Style", slug: "y2k-aesthetic" },
  { title: "Retro 90s", description: "90s fashion revival with grunge, minimalism, and iconic trends", category: "Fashion & Style", slug: "retro-90s" },
  { title: "Retro 80s", description: "Bold 80s fashion with neon colors, power dressing, and maximalism", category: "Fashion & Style", slug: "retro-80s" },
  { title: "Retro 70s", description: "Groovy 70s vibes with bohemian fashion and disco glamour", category: "Fashion & Style", slug: "retro-70s" },
  { title: "Retro 60s", description: "Mod fashion and swinging sixties style", category: "Fashion & Style", slug: "retro-60s" },
  { title: "1950s Film Noir", description: "Classic noir aesthetics with dramatic shadows and vintage Hollywood glamour", category: "Fashion & Style", slug: "1950s-film-noir" },
  { title: "1950s Pin-Up Girl", description: "Vintage pin-up aesthetic with retro styling and playful poses", category: "Fashion & Style", slug: "1950s-pin-up-girl" },
  { title: "Cyberpunk", description: "Futuristic cyberpunk aesthetics with neon, tech, and dystopian style", category: "Fashion & Style", slug: "cyberpunk" },
  { title: "Neon Tokyo", description: "Japanese cyberpunk vibes with neon lights and urban nightscapes", category: "Fashion & Style", slug: "neon-tokyo" },
  { title: "Pink Doll", description: "Playful, doll-inspired fashion with pastel pink aesthetics", category: "Fashion & Style", slug: "pink-doll" },
  
  // Fitness & Sports
  { title: "Fitness Influencer", description: "Motivational fitness content that showcases strength and athleticism", category: "Fitness & Sports", slug: "fitness-influencer" },
  { title: "Fitness", description: "Dynamic fitness photography that captures movement and athletic performance", category: "Fitness & Sports", slug: "fitness" },
  { title: "Cheerleader", description: "Energetic cheerleading photos with team spirit and athletic grace", category: "Fitness & Sports", slug: "cheerleader" },
  
  // Events & Parties
  { title: "College Party", description: "Capture the energy and fun of college social life", category: "Events & Parties", slug: "college-party" },
  { title: "Met Gala", description: "High fashion red carpet glamour inspired by the Met Gala", category: "Events & Parties", slug: "met-gala" },
  { title: "Nightlife", description: "Urban nightlife scenes with club and bar atmospheres", category: "Events & Parties", slug: "nightlife" },
  { title: "Berlin Nightlife", description: "Underground techno club aesthetics and Berlin party culture", category: "Events & Parties", slug: "berlin-nightlife" },
  { title: "Wedding", description: "Beautiful wedding photography for the perfect day", category: "Events & Parties", slug: "wedding" },
  { title: "Graduation", description: "Celebrate academic achievements with professional graduation photos", category: "Events & Parties", slug: "graduation" },
  { title: "Coachella", description: "Festival fashion and desert party vibes", category: "Events & Parties", slug: "coachella" },
  
  // Cosplay & Fantasy
  { title: "Cosplay", description: "Bring your favorite characters to life with cosplay photography", category: "Cosplay & Fantasy", slug: "cosplay" },
  { title: "E-Girl", description: "Alternative e-girl aesthetic with colorful hair and gaming culture", category: "Cosplay & Fantasy", slug: "e-girl" },
  { title: "Celebrity", description: "Celebrity-style photography with paparazzi and red carpet vibes", category: "Cosplay & Fantasy", slug: "celebrity" },
  { title: "Catgirl", description: "Anime-inspired catgirl character photography", category: "Cosplay & Fantasy", slug: "catgirl" },
  { title: "Fairy Tale", description: "Magical fairy tale aesthetics with enchanted forest vibes", category: "Cosplay & Fantasy", slug: "fairy-tale" },
  { title: "AI Yearbook", description: "Create nostalgic yearbook-style portraits with retro aesthetics", category: "Cosplay & Fantasy", slug: "ai-yearbook" },
  
  // Creative Portraits
  { title: "RGB Portrait", description: "Artistic portraits with RGB color splitting effects", category: "Creative Portraits", slug: "rgb-portrait" },
  { title: "Extreme Close-Ups", description: "Intimate, detailed close-up portraits that capture emotion", category: "Creative Portraits", slug: "extreme-close-ups" },
  { title: "Soap Bubbles", description: "Whimsical portraits with soap bubble elements and dreamy aesthetics", category: "Creative Portraits", slug: "soap-bubbles" },
  
  // Adult Content (18+)
  { title: "Sexy Halloween", description: "Seductive Halloween-themed boudoir photography", category: "Adult Content (18+)", slug: "sexy-halloween" },
  { title: "OnlyFans", description: "Professional content creation for adult platforms", category: "Adult Content (18+)", slug: "onlyfans" },
  { title: "Lingerie", description: "Elegant lingerie photography with tasteful styling", category: "Adult Content (18+)", slug: "lingerie" },
  { title: "Boudoir", description: "Intimate boudoir photography that celebrates confidence and beauty", category: "Adult Content (18+)", slug: "boudoir" },
  { title: "Sexy Valentine", description: "Romantic and sensual Valentine's Day themed photography", category: "Adult Content (18+)", slug: "sexy-valentine" },
  { title: "AI Girlfriend", description: "Create virtual girlfriend content with AI", category: "Adult Content (18+)", slug: "ai-girlfriend" },
  { title: "Sexy Santa", description: "Festive holiday boudoir with Santa-inspired themes", category: "Adult Content (18+)", slug: "sexy-santa" },
  { title: "Bikini In The Snow", description: "Bold winter bikini photography with snow contrasts", category: "Adult Content (18+)", slug: "bikini-in-the-snow" },
  { title: "Latex", description: "Fashion-forward latex photography with bold styling", category: "Adult Content (18+)", slug: "latex" },
  { title: "Cyberpunk Boudoir", description: "Futuristic cyberpunk meets sensual boudoir aesthetics", category: "Adult Content (18+)", slug: "cyberpunk-boudoir" },
  { title: "Cosplay Lingerie", description: "Character-inspired lingerie and cosplay fusion", category: "Adult Content (18+)", slug: "cosplay-lingerie" },
  { title: "Strapped", description: "Edgy fashion photography with strapped accessories and bold styling", category: "Adult Content (18+)", slug: "strapped" }
];
