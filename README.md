# The Insurance Guardian - Parking Pages

SparkPage parking page system for insurance marketing campaigns.

## Cloudflare Pages Deployment

### Important Configuration:

1. **Build Settings in Cloudflare Pages Dashboard:**
   - **Build command**: Leave empty (this is a static site)
   - **Build output directory**: Set to `lps` (this is critical!)
   - **Root directory**: Leave as `/` (root of repository)

2. **Why `lps` as build output?**
   - The landing page templates are in the `lps/` folder
   - Setting build output to `lps` makes those files available at the root URL
   - Example: `lps/auto_ins/parking.html` becomes `yoursite.com/auto_ins/parking.html`

3. **Config Files:**
   - Config files are in `config-files/` folder at the repository root
   - They will be accessible at `/config-files/` when deployed
   - The HTML files use absolute paths like `/config-files/auto_ins-config.json`

## Project Structure

```
├── lps/                    # Landing page templates (build output)
│   ├── auto_ins/          # Auto insurance pages
│   ├── comm_ins/          # Commercial insurance pages
│   ├── mva_ins/           # Motor vehicle accident insurance pages
│   ├── parking.html       # Basic template
│   └── parkingplus.html   # Enhanced template with images
├── config-files/          # JSON configuration files
├── tools/                 # Config generator tool
├── documentation/         # User guide
└── start-here.html        # Project overview page
```

## Usage

### Access Landing Pages:

```
https://yoursite.com/auto_ins/parking.html?config=auto_ins
https://yoursite.com/comm_ins/parking.html?config=comm_ins-truck
https://yoursite.com/mva_ins/parking.html?config=mva_ins
```

### Available Configs:

- `auto_ins` - Auto Insurance
- `comm_ins-truck` - Commercial Truck Insurance
- `comm_ins` - Commercial Insurance (Non-Trucking)
- `mva_ins` - Motor Vehicle Accident Insurance

## Local Development

1. Start a local server:
```bash
python -m http.server 8000
```

2. Access pages:
```
http://localhost:8000/lps/auto_ins/parking.html?config=auto_ins
```

## License

All rights reserved.

