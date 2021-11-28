const {create: createYoutubeDl} = require('youtube-dl-exec');
const inquirer = require('inquirer');

const youtubedl = createYoutubeDl('./bin/yt-dlp.exe')


function downloadVideo(url, format) {
    let options;
    if (format === 'mp4') {
        options = {
            format,
            output: `%USERPROFILE%/Videos/YT-Download/%(title)s.%(ext)s`
        }
    } else if (format === 'mp3') {
        options = {
            preferFfmpeg: true,
            ffmpegLocation: './bin/ffmpeg.exe',
            extractAudio: true,
            audioFormat: 'mp3',
            output: `%USERPROFILE%/Videos/YT-Download/%(title)s.%(ext)s`
        }
    }
    const subprocess = youtubedl.exec(url, options);

    console.log('Downloading video');
    console.log('-----------------');
    console.log(`Running download as ${subprocess.pid}`);
    subprocess.stdout.on('data', data => console.log(`${data}`));
}

(function () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'Enter the URL of the video you want to download',
        },
        {
            type: 'list',
            name: 'format',
            message: 'Select the format you want to download',
            choices: ['mp4','mp3'],
        },
    ]).then(answers => {
        downloadVideo(answers.url, answers.format);
    });
})();

