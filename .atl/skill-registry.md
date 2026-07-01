# Skill Registry — apprspector

Generated: 2026-06-30T22:03 (SDD Init)
Persistence: Engram-only

## Project Convention Files

| File | Path |
|------|------|
| Agent Rules | [AGENTS.md](../AGENTS.md) |
| Claude Instructions | [CLAUDE.md](../CLAUDE.md) |

Referenced by AGENTS.md:
- `node_modules/next/dist/docs/` — canonical Next.js docs (breaking changes)

## Available Skills

### User-Level Skills (`~/.config/opencode/skills/` and `~/.claude/skills/`)

| Skill | Trigger | Path |
|-------|---------|------|
| agent-coordination | Multiple agents, worktrees, parallel execution | `~/.claude/skills/agent-coordination/SKILL.md` |
| argentina-al-espacio-comms | Hackathon email to Caro or institutions | `~/.claude/skills/argentina-al-espacio-comms/SKILL.md` |
| argentina-al-espacio-envio-masivo | Mass email press kits | `~/.claude/skills/argentina-al-espacio-envio-masivo/SKILL.md` |
| argentina-al-espacio-historias | Instagram stories for hackathon | `~/.claude/skills/argentina-al-espacio-historias/SKILL.md` |
| argentina-al-espacio-html | Interactive HTML presentations for hackathon venue | `~/.claude/skills/argentina-al-espacio-html/SKILL.md` |
| argentina-al-espacio-pdf | Keynote-quality PDF presentations | `~/.claude/skills/argentina-al-espacio-pdf/SKILL.md` |
| argentina-al-espacio-publicidad | Social media ads for hackathon | `~/.claude/skills/argentina-al-espacio-publicidad/SKILL.md` |
| argentina-al-espacio-video | Remotion video compositions for hackathon | `~/.claude/skills/argentina-al-espacio-video/SKILL.md` |
| branch-pr | PR creation with issue-first checks | `~/.config/opencode/skills/branch-pr/SKILL.md` |
| calendario-contenidos | Content calendar progress tracking | `~/.config/opencode/skills/calendario-contenidos/SKILL.md` |
| carrusel-politico | Political news Instagram carousels | `~/.claude/skills/carrusel-politico/SKILL.md` |
| chained-pr | PRs over 400 lines, stacked PRs | `~/.config/opencode/skills/chained-pr/SKILL.md` |
| clase-master | Orchestrator: generates ALL class assets | `~/.config/opencode/skills/clase-master/SKILL.md` |
| clase-produccion | Educational class content generation | `~/.config/opencode/skills/clase-produccion/SKILL.md` |
| codebase-memory | Code graph queries, architecture, impact analysis | `~/.claude/skills/codebase-memory/SKILL.md` |
| cognitive-doc-design | Cognitive-load-reducing design docs | `~/.config/opencode/skills/cognitive-doc-design/SKILL.md` |
| comment-writer | PR feedback, collaboration comments | `~/.config/opencode/skills/comment-writer/SKILL.md` |
| customize-opencode | Editing opencode's own config | Built-in |
| elevenlabs-video-speech | Voice-over scripts for ElevenLabs TTS | `~/.config/opencode/skills/elevenlabs-video-speech/SKILL.md` |
| fusalabs-internal-comms | Internal team emails/Telegram (Fusa Labs) | `~/.config/opencode/skills/fusalabs-internal-comms/SKILL.md` |
| fusalabs-meeting-feedback | Meeting feedback from Fathom recordings | `~/.config/opencode/skills/fusalabs-meeting-feedback/SKILL.md` |
| fusalabs-notion-action | Execute Notion Brain changes with validation | `~/.config/opencode/skills/fusalabs-notion-action/SKILL.md` |
| fusalabs-notion-interpretation | Extract structured data from sessions to Notion | `~/.config/opencode/skills/fusalabs-notion-interpretation/SKILL.md` |
| fusalabs-work-log | Session logging for billing (Notion) | `~/.claude/skills/fusalabs-work-log/SKILL.md` |
| future-carrusel-produccion | Instagram carousel posts (7-10 slides) | `~/.claude/skills/future-carrusel-produccion/SKILL.md` |
| future-mass-mail | Mass email with rate limiting and dry-run | `~/.claude/skills/future-mass-mail/SKILL.md` |
| future-stories-conversion | Conversion Instagram stories (4-5 per sequence) | `~/.claude/skills/future-stories-conversion/SKILL.md` |
| go-testing | Go test patterns, golden files, teatest | `~/.claude/skills/go-testing/SKILL.md` |
| guion-produccion | Premium video scripts | `~/.config/opencode/skills/guion-produccion/SKILL.md` |
| historia-produccion | 15 premium Instagram stories as HTML | `~/.config/opencode/skills/historia-produccion/SKILL.md` |
| html-presentacion-interactiva | Interactive HTML presentations for live class | `~/.claude/skills/html-presentacion-interactiva/SKILL.md` |
| inter-agent-engram | Inter-agent communication via Engram | `~/.config/opencode/skills/inter-agent-engram/SKILL.md` |
| issue-creation | GitHub issue creation with checks | `~/.config/opencode/skills/issue-creation/SKILL.md` |
| judgment-day | Blind dual review + re-judge cycle | `~/.config/opencode/skills/judgment-day/SKILL.md` |
| meme-humor-video | Short humor/meme videos from image sequences | `~/.config/opencode/skills/meme-humor-video/SKILL.md` |
| muzzarella-ads | Meta Ads (3 formats) for Mrs Muzzarella | `~/.claude/skills/muzzarella-ads/SKILL.md` |
| muzzarella-carrusel | Instagram carousels for Mrs Muzzarella | `~/.claude/skills/muzzarella-carrusel/SKILL.md` |
| muzzarella-creativa | DALL-E scene generation for Mrs Muzzarella | `~/.claude/skills/muzzarella-creativa/SKILL.md` |
| muzzarella-stories | 8-12 Instagram Stories for Mrs Muzzarella | `~/.claude/skills/muzzarella-stories/SKILL.md` |
| muzzarella-video | Remotion video for Mrs Muzzarella | `~/.claude/skills/muzzarella-video/SKILL.md` |
| pdf-produccion | Keynote-quality HTML presentations for class | `~/.config/opencode/skills/pdf-produccion/SKILL.md` |
| publicidad-produccion | 8 premium social media ads for class | `~/.config/opencode/skills/publicidad-produccion/SKILL.md` |
| video-postproduccion | Post-production pipeline (Whisper + Remotion) | `~/.claude/skills/video-postproduccion/SKILL.md` |
| video-produccion | Vertical Remotion videos for Reels/TikTok | `~/.config/opencode/skills/video-produccion/SKILL.md` |
| video-produccion-youtube | Horizontal YouTube videos (1920x1080) | `~/.config/opencode/skills/video-produccion-youtube/SKILL.md` |
| work-unit-commits | Commit planning as reviewable work units | `~/.config/opencode/skills/work-unit-commits/SKILL.md` |

### SDD Skills (auto-excluded from content skills — workflow only)

sdd-explore, sdd-propose, sdd-spec, sdd-design, sdd-tasks, sdd-apply, sdd-verify, sdd-archive, sdd-onboard, sdd-init, skill-registry, _shared
