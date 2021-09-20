var Variables = module.exports = {
    loop: false,
    playlists: [ // Format [{playlistName: "xxx", musics: [{musicName: "yyy", musicLink: "zzz"}]}]
        {
            playlistName: "vidéos",
            musics: [
                /*{
                    musicName: "music1",
                    musicLink: "https://www.youtube.com/watch?v=uabqLdsBtA0"
                },
                {
                    musicName: "music2",
                    musicLink: "https://www.youtube.com/watch?v=DDA7jSic2uM"
                },
                {
                    musicName: "music3",
                    musicLink: "https://www.youtube.com/watch?v=lj--RBWD_88"
                },
                {
                    musicName: "music4",
                    musicLink: "https://www.youtube.com/watch?v=c5R3oMx5QVw"
                }*/
            ]
        }
    ],
    playlistReading: "",
    playlistMusicIndex: 0,
    playingSingleMusic: false,
    youtubeSearch: [], // Format [{name: "xxx", link: "yyy"}]
    insultes: ['putain', 'merde', 'fdp', 'enculé', 'encule', 'enculer', 'pd', 'ntm', 'salope'],
    insultesAlsace: ['kopfertami', 'lusbueb', 'lusmaidele', 'krutbur', 'dorfseckel', 'dummer', 'dummi', 'lahmarsch',
        'arschloch', 'johmeri', 'hasebock', 'falscheseckel', 'dracksoi', 'nudla', 'schofseckel', 'suffloch']
};