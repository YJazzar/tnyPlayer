# tnyPlayer - Status: migrating to use webpack

entry for render:
/app/index.tsx

enrty for main:
/app/main.dev.ts

## Tutorial for making electron notifications:

-   https://stackoverflow.com/questions/42851198/how-can-i-send-a-notification-in-electron

## Running the program

examples:

# TODO:

-   use the chalk package to make interesting changes

# Bugs:

-   When resizing the window to become larger, the right resizable div sometimes gains a big border that would only go away if resized again.

*   When i come back:
    -   RENAME HORIZONTAL RESIZER TO VERTICAL RESIZER
    -   clean the old code that was using the re-resize library (the panel configs, their impls, and clean up state variables for the vertical resizer)
    -   Start making the horizontal rezizer
