#!/usr/bin/env bash
set -euo pipefail

AVD_NAME="${1:-Pixel_6}"
EMU="$HOME/Android/Sdk/emulator/emulator"
ADB="$HOME/Android/Sdk/platform-tools/adb"

# Start emulator in background with the flags that work for you
"$EMU" -avd "$AVD_NAME" \
  -accel on \
  -gpu swiftshader_indirect \
  -no-snapshot \
  -no-boot-anim \
  >/dev/null 2>&1 &

# Wait for device to appear and finish booting
"$ADB" kill-server >/dev/null 2>&1 || true
"$ADB" start-server >/dev/null
"$ADB" wait-for-device

# Wait until sys.boot_completed=1
echo "Waiting for $AVD_NAME to finish booting..."
until [ "$("$ADB" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; do
  sleep 2
done
echo "$AVD_NAME is ready."
