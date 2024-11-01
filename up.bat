@echo off
REM ============================================================
REM Batch Script to Add, Commit, and Push Changes to GitHub
REM ============================================================

REM Define the path to your project directory
SET "PROJECT_DIR=C:\Users\i3z\Desktop\website"

REM Navigate to the project directory
cd /d "%PROJECT_DIR%"
IF ERRORLEVEL 1 (
    echo Failed to navigate to directory: %PROJECT_DIR%
    echo Please check the path and try again.
    pause
    exit /b
)

REM Verify Git is installed
git --version >nul 2>&1
IF ERRORLEVEL 1 (
    echo Git is not installed or not found in PATH.
    echo Please install Git from https://git-scm.com/ and ensure it's added to your system PATH.
    pause
    exit /b
)

REM Check if the directory is a Git repository
git rev-parse --is-inside-work-tree >nul 2>&1
IF ERRORLEVEL 1 (
    echo The directory "%PROJECT_DIR%" is not a Git repository.
    echo Initialize Git or navigate to the correct repository.
    pause
    exit /b
)

REM Stage all changes
echo Staging all changes...
git add .
IF ERRORLEVEL 1 (
    echo Failed to stage changes.
    pause
    exit /b
)

REM Check if there are changes to commit
git diff-index --quiet HEAD --
IF %ERRORLEVEL% EQU 0 (
    echo No changes detected. Nothing to commit.
) ELSE (
    REM Prompt user for a commit message
    set /p commit_msg=Enter commit message: 
    IF "%commit_msg%"=="" (
        set "commit_msg=Update website files"
    )

    REM Commit the changes
    echo Committing changes...
    git commit -m "%commit_msg%"
    IF ERRORLEVEL 1 (
        echo Failed to commit changes. Please check your Git configuration.
        pause
        exit /b
    )

    REM Push the changes to the main branch
    echo Pushing changes to GitHub...
    git push origin main
    IF ERRORLEVEL 1 (
        echo Failed to push changes. Please check your internet connection and GitHub credentials.
        pause
        exit /b
    )

    echo.
    echo ============================================================
    echo Changes have been successfully pushed to GitHub!
    echo ============================================================
)

REM Optional: Play a sound upon completion (requires a .wav file)
REM Uncomment the following lines if you want a sound notification
REM start /min mplay32 /play /close "C:\path\to\sound.wav"

pause
