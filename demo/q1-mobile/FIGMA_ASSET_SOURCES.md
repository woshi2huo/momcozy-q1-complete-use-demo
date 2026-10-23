# Q1 Runtime Image Sources

Completion sheet: `assets/hd/pumping-finish-figma.png` is a 3x PNG export of node `1094:20097` from file `GWaREkdfme4eVzdMQ4AY4v`, exported on 2026-10-23. Original typography, dial artwork, scale, and sheet gradient are retained beneath interactive controls.

Verified for demo version `0.6.46` on October 22, 2026.

- Figma file key: `GWaREkdfme4eVzdMQ4AY4v`
- Q1 page: `462:15542`
- Runtime bitmap screens load only from `assets/hd/` through `baseImage(screen)`.
- The low-resolution files directly under `assets/` are legacy files and are not used by the runtime screen map.
- Interactive values, progress, labels, and hotspots may be layered over a Figma bitmap, but the bitmap itself is a direct Figma export.

| Runtime asset | Figma node | Notes |
| --- | --- | --- |
| `pairing-home.png` | `1094:27064` | Q1 V1.2 empty device page |
| `my-devices.png` | `1094:24461` | My Device multi-device home; direct 3x Figma export, shared back destination for all three pump subhome states |
| `auto-discovery-iphone17.png` | `1094:17979` | Q1 V1.2 auto-discovery sheet |
| `auto-connecting-iphone17.png` | `1094:17979` | Same Figma base; connecting state is interactive |
| `auto-complete-iphone17.png` | `1094:40406` | Q1 V1.2 discovery-complete sheet |
| `manual-add-iphone17.png` | `1094:17641` | Q1 V1.2 manual add device |
| `manual-scan.png` | `1094:17660` | Q1 V1.2 scan device |
| `manual-confirm.png` | `1094:17681` | Q1 V1.2 connection confirmation |
| `manual-progress.png` | `1094:40697` | Q1 V1.2 phone connection progress |
| `manual-complete.png` | `1094:17702` | Q1 V1.2 connection complete |
| `training-welcome.png` | `1094:24620` | Q1 V1.2 device assistant welcome |
| `training-guide.png` | `1094:24783` | Q1 V1.2 device assistant detail |
| `training-guide-final.png` | `1094:24680` | Q1 V1.2 device assistant final detail |
| `training-ready.png` | `1094:24739` | Q1 V1.2 device assistant completion |
| `cozy-assistant.png` | `hKGfWAWYhdkEabZoMz4Bxq / 14143:4957` | CozyAI Device home; direct 3x PNG export from Figma, opened by the tutorial rabbit button |
| `cozie-ai-pumping.png` | `1259:47073` | Cozie AI pumping-data answer; direct 3x PNG export, opened from subhome AI entry |
| `../subhome-ai-entry.png` | `1094:20027` | Rabbit AI entry cropped from the 3x subhome export at its original 402 × 874 placement |
| `subhome-empty.png` | `1094:22347` | Empty lactation subhome, matching the woman illustration and Record action |
| `subhome-recorded.png` | `1094:22364` | Lactation subhome with one pumping record |
| `subhome-plan-empty.png` | `1094:22432`, device header from `1094:25549` | Lactation subhome with a plan and no completed session; Q1 device identity and battery status match the current design |
| `subhome-plan-recorded.png` | `1094:22457`, device header from `1094:25549` | Lactation subhome with a plan and a completed session; Q1 device identity and battery status match the current design |
| `subhome-pumping-active.png` | `1094:25549` | Lactation subhome while Q1 is actively pumping; used after pressing the home-page play button |
| `plan-intro.png` | `1094:22672` | AI lactation plan introduction |
| `plan-form.png` | `1094:22749` | Basic Information form |
| `plan-loading.png` | `1094:22886` | Plan generation progress and pumping tips |
| `plan-schedule.png` | `1094:22947` | Generated plan schedule confirmation |
| `pumping-logged.png` | `1094:22592` | Q1 V1.2 complete Logged page |
| `device-control.png` | `1094:40899` | Q1 V1.2 device control base; runtime overlay removes Wi-Fi, retains Bluetooth/battery, and adds Help/Settings on every control state |
| `rhythm-list.png` | `1094:20527` | Q1 V1.2 rhythm list, including overflow content |
| `new-program.png` | `1094:27117` | Q1 V1.2 create Program |
| `program-detail.png` | `1094:27144` | Q1 V1.2 Program detail |
| `program-section-create.jpg` | `1094:18898` | Q1 V1.2 create-rhythm editor with sticky Next |
| `program-section-rest.jpg` | `1094:19038` | Q1 V1.2 Rest editor with sticky Next |
| `program-detail-section.jpg` | `1094:19144` | Q1 V1.2 Program detail with a saved section |
| `program-detail-actions.jpg` | `1094:19212` | Q1 V1.2 Program detail with duplicate/delete actions exposed |
| `program-mode-selection.png` | `1094:20433` | Q1 V1.2 exact Mode Selection frame |
| `settings.png` | `1094:41695` | Q1 V1.2 settings |
| `firmware-alert.png` | `1094:58350` | Q1 V1.2 firmware confirmation |
| `firmware-upgrade.png` | `1094:17425` | Q1 V1.2 MCU upgrade progress |

## Verification Method

Each active local bitmap was resized to its Figma frame dimensions and compared against a fresh Figma screenshot or direct Figma export. The matches have low mean absolute pixel differences caused by export scaling and PNG rasterization. Browser smoke tests also confirmed all 34 runtime images load successfully with no console errors or warnings.
