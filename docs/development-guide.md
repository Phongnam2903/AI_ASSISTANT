# Hướng dẫn phát triển

Cập nhật: 2026-09-07. Repository hiện là hồ sơ/skeleton Phase 0; chưa có app chạy được. Chủ dự án cần duyệt [Phase 1 plan](phase-1-implementation-plan.md) trước khi bắt đầu code.

## Cấu trúc hiện có

```text
AI_Assistant/
  README.md
  .env.example
  .gitignore
  .gitattributes
  .editorconfig
  apps/
    README.md
    desktop/README.md
    backend/README.md
  packages/
    README.md
    contracts/README.md
  infrastructure/README.md
  scripts/README.md
  docs/
    architecture.md
    requirements.md
    agent-flow.md
    security.md
    roadmap.md
    development-guide.md
    phase-0-verification.md
    phase-1-implementation-plan.md
    adr/
      README.md
      0001-project-architecture.md
      0002-agent-framework.md
      0003-memory-strategy.md
      0004-voice-first-interaction.md
```

Mỗi thư mục có README để Git giữ cấu trúc và người triển khai biết trách nhiệm. `src/`, manifests, lockfiles, tests và Compose sẽ được tạo ở phase có implementation; cây trên không giả định chúng đã tồn tại.

## Môi trường theo giai đoạn

| Phase | Điều kiện |
| --- | --- |
| Đọc/kiểm tra Phase 0 | Git; Python standard library nếu chạy kiểm tra link; không cần cài dependency |
| Phase 1 | Node LTS còn hỗ trợ + npm, Rust MSVC, C++ Build Tools/Windows SDK và WebView2 |
| Phase 2–3 | Thêm Python/FastAPI và speech/provider dependencies được chọn, microphone/speaker, local auth |
| Phase 6 | Thêm PostgreSQL/pgvector/Redis; Docker/Compose nếu dùng topology đề xuất |

Tauri yêu cầu C++ Build Tools và WebView2 cho Windows. [Prerequisites chính thức](https://v2.tauri.app/start/prerequisites/). Chọn Node theo [release schedule](https://nodejs.org/en/about/previous-releases), không coi version tìm thấy trong audit là baseline được duyệt.

Audit hiện tại có npm EPERM, uv bị chặn và Docker daemon không truy cập được; C++ probe không trả installation phù hợp. Chi tiết trong [verification](phase-0-verification.md). Không sửa global Git config, cài toolchain hoặc đổi quyền hệ thống chỉ để hoàn thành tài liệu.

## Mẫu cấu hình

[.env.example](../.env.example) là contract đề xuất cho backend tương lai, chưa có loader. Phase 1 không cần sao chép hoặc điền key. Khi backend tồn tại, hướng dẫn phải ghi chính xác nơi nạp và cách validate biến thiếu.

| Biến | Ý nghĩa và phase |
| --- | --- |
| `APP_ENV`, `LOG_LEVEL` | Môi trường/log metadata backend, Phase 2 |
| `ASSISTANT_NAME`, `ASSISTANT_LOCALE` | Tên và ngôn ngữ; cấu hình desktop ban đầu qua Settings, đồng bộ backend từ Phase 2 |
| `ASSISTANT_TIMEZONE` | `system` là sentinel do ứng dụng phải xử lý thành timezone local, không phải tên IANA đưa thẳng vào thư viện |
| `BACKEND_HOST`, `BACKEND_PORT` | Loopback/port phát triển đề xuất; bản sidecar có thể dùng port động qua bootstrap |
| `VAD_PROVIDER`, `STT_PROVIDER`, `STT_MODEL` | Khóa sau audio/provider evaluation Phase 2 |
| `TTS_PROVIDER`, `TTS_MODEL`, `TTS_VOICE` | Khóa sau kiểm tra tiếng Việt/playback Phase 2 |
| `LLM_PROVIDER`, `LLM_MODEL` | Provider/model được chọn Phase 3 |
| `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY` | Chỉ backend, điền key của dịch vụ được chọn; không đưa vào `VITE_*` |
| `REDIS_URL`, `DATABASE_URL` | Tùy chọn từ Phase 6; mẫu để trống, credential thật không commit |

Provider bổ sung có biến riêng khi adapter tồn tại. Token local session sinh runtime và truyền riêng; không lưu trong `.env.example`. Frontend preference không nhạy cảm có storage riêng ở Phase 1.

## Quy trình làm việc

1. Đọc requirements, ADRs và plan phase; ghi phạm vi đã được chủ dự án duyệt.
2. Kiểm tra toolchain phù hợp; ghi version thực tế khi khóa dependencies. Commit manifests/lockfiles cùng implementation.
3. Thêm module theo nhu cầu; không dựng service/package trước consumer thật.
4. Chạy checks phù hợp và kiểm tra native/audio trên Windows thật ở phase tương ứng.
5. Cập nhật README, bằng chứng và giới hạn. Chỉ đánh `[x]` cho việc đã kiểm chứng; approval do chủ dự án cung cấp.

Không có lệnh khởi chạy app hiện tại. Phase 1 sau scaffold phải ghi lệnh install/typecheck/build/dev đúng manifests; Phase 2 thêm lệnh backend, protocol và provider setup. Không dùng lệnh dự kiến làm bằng chứng đã chạy.

## Kiểm tra hồ sơ không cài dependency

Từ thư mục root, dùng PowerShell:

```powershell
rg --files --hidden -g '!.git'
git -c safe.directory=D:/PROJECT/AI_Assistant -c core.excludesFile= diff --check
@'
from pathlib import Path
import re
root = Path.cwd()
files = [p for p in root.rglob('*.md') if '.git' not in p.parts]
errors = []
for path in files:
    text = path.read_text(encoding='utf-8')
    if len(re.findall(r'^```', text, re.M)) % 2:
        errors.append(f'{path}: unbalanced code fences')
    prose = re.sub(r'^```[^\n]*\n.*?^```\s*$', '', text, flags=re.M | re.S)
    for target in re.findall(r'\[[^\]]+\]\(([^)]+)\)', prose):
        if '://' in target or target.startswith('#'):
            continue
        dest = (path.parent / target.split('#', 1)[0]).resolve()
        if not dest.is_relative_to(root.resolve()) or not dest.is_file():
            errors.append(f'{path}: invalid local link {target}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: local links and code fences in {len(files)} Markdown files')
'@ | python -
```

Thay đường dẫn `safe.directory` nếu checkout ở vị trí khác. Đây là override cho từng lệnh khi ownership khác, không sửa cấu hình Git toàn cục. `core.excludesFile=` chỉ tránh đọc global ignore không truy cập được trong phiên kiểm tra này; `.gitignore` của dự án vẫn được áp dụng.

Kiểm tra trên xác minh links và fence, không render Mermaid hoặc build app. Báo cáo Phase 0 bổ sung kiểm tra whitespace/UTF-8, env key trùng và mẫu credential trống, ignore rules, scope file, trạng thái roadmap và approval chưa đánh dấu. Những kiểm tra này không thay thế runtime tests.
