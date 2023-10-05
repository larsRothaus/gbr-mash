"use strict"
const isDebug = true;
const builder = require("electron-builder")
const Platform = builder.Platform
const electronRebuild = require('electron-rebuild');
const {spawn} = require('child_process');
// process.env.ELECTRON_MIRROR =
//   'https://github.com/castlabs/electron-releases/releases/download/v';

if (process.platform === 'darwin') {
  process.env.CSC_IDENTITY_AUTO_DISCOVERY = false;
}
process.env.ELECTRON_ENV = 'development'

const vmpSign = (command, packagePath) => new Promise(resolve => {
  const castlabs_evs = spawn(command, ['-m', 'castlabs_evs.vmp','sign-pkg', packagePath]);
  castlabs_evs.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
  });

  castlabs_evs.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
  });

  castlabs_evs.on('exit', function (code) {
    console.log(`## [electron.build] exit | code:`,code );
    resolve();
  });
})

// Let's get that intellisense working
/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const options = {
  productName: "UselessEmu-Later",
  appId: "com.media.useless",
  electronDownload: {
    "mirror": "https://github.com/castlabs/electron-releases/releases/download/v"
  },

  // "store” | “normal” | "maximum". - For testing builds, use 'store' to reduce build time significantly.
  compression: "normal",
  removePackageScripts: true,

  afterSign: async (context) => {
    // Mac releases require hardening+notarization: https://developer.apple.com/documentation/xcode/notarizing_macos_software_before_distribution
    if (!isDebug && context.electronPlatformName === 'darwin') {
      // await notarizeMac(context)
    }
    if (process.platform === 'win32') {
      console.log('Windows VmpSign');
      return vmpSign('python', 'release/build/win-unpacked');
    }
  },
  artifactBuildStarted: (context) => {
    // identifyLinuxPackage(context)
  },
  afterAllArtifactBuild: (buildResult) => {
    // return stampArtifacts(buildResult)
  },
  // force arch build if using electron-rebuild
  beforeBuild: async (context) => {
    const { appDir, electronVersion, arch } = context;
    console.log(`## [electron.build] beforeBuild | electronVersion:`,electronVersion, arch);

    await electronRebuild.rebuild({ buildPath: appDir, electronVersion:'v'+electronVersion, arch })
    return false
  },
  afterPack: async (context)=>{
    const exeCommand = 'python3 -m castlabs_evs.vmp sign-pkg release/build/mac';
    // const execProcess = exec(exeCommand)
    // execProcess.stdout.on('data', function(data) {
    //   console.log('##|',data);
    // });
    if (context.electronPlatformName === "darwin") {
      console.log(`## [electron.build] afterPack | Is this shit before sign`);
      return vmpSign('python3', 'release/build/mac');
    }
    // if (context.electronPlatformName === 'win32') {
    //   return vmpSign('python', 'release/build/win-unpacked');
    // }
  },
  nodeGypRebuild: false,
  buildDependenciesFromSource: false,
  files: [
    "dist",
    "node_modules",
    "package.json"
  ],

  directories: {
    app: "release/app",
    buildResources: "assets",
    output: "release/build"
  },
  extraResources: [
    "./assets/**"
  ],
  mac: {
    target: {
      target: "default",
      arch: [
        "x64"
      ]
    },
    type: "distribution",
    hardenedRuntime: true,
    entitlements: "assets/entitlements.mac.plist",
    entitlementsInherit: "assets/entitlements.mac.plist",
    gatekeeperAssess: false
  },
  // extraFiles: [
  //   {
  //     from: "build/Release",
  //     to: nodeAddonDir,
  //     filter: "*.node"
  //   }
  // ],
  win: {
    target: 'portable',
    artifactName:  '${productName}-${version}.${ext}'
  },
  // nsis: {
  //   deleteAppDataOnUninstall: true,
  //   include: "installer/win/nsis-installer.nsh"
  // },
  // ,
  // dmg: {
  //   background: "installer/mac/dmg-background.png",
  //   iconSize: 100,
  //   contents: [
  //     {
  //       x: 255,
  //       y: 85,
  //       type: "file"
  //     },
  //     {
  //       x: 253,
  //       y: 325,
  //       type: "link",
  //       path: "/Applications"
  //     }
  //   ],
  //   window: {
  //     width: 500,
  //     height: 500
  //   }
  // },
  //
  // linux: {
  //   desktop: {
  //     StartupNotify: "false",
  //     Encoding: "UTF-8",
  //     MimeType: "x-scheme-handler/deeplink"
  //   },
  //   target: ["AppImage", "rpm", "deb"]
  // },
  // deb: {
  //   priority: "optional",
  //   afterInstall:"installer/linux/after-install.tpl",
  // },
  // rpm: {
  //   fpm: ["--before-install", "installer/linux/before-install.tpl"],
  //   afterInstall:"installer/linux/after-install.tpl",
  // }
};

// Promise is returned
builder.build({
  targets: process.platform === 'win32' ? Platform.WINDOWS.createTarget() : Platform.MAC.createTarget(),
  config: options
})
  .then((result) => {
    console.log(JSON.stringify(result))
  })
  .catch((error) => {
    console.error(error)
  })

/*
"build": {
    "productName": "UselessEmu-Later",
    "appId": "com.media.useless",
    "asar": true,
    "asarUnpack": "**\\*.{node,dll}",
    "files": [
      "dist",
      "node_modules",
      "package.json"
    ],
    "afterSign": ".erb/scripts/notarize.js",
    "mac": {
      "target": {
        "target": "default",
        "arch": [
          "arm64",
          "x64"
        ]
      },
      "type": "distribution",
      "hardenedRuntime": true,
      "entitlements": "assets/entitlements.mac.plist",
      "entitlementsInherit": "assets/entitlements.mac.plist",
      "gatekeeperAssess": false
    },
    "dmg": {
      "contents": [
        {
          "x": 130,
          "y": 220
        },
        {
          "x": 410,
          "y": 220,
          "type": "link",
          "path": "/Applications"
        }
      ]
    },
    "win": {
      "target": [
        "nsis"
      ]
    },
    "linux": {
      "target": [
        "AppImage"
      ],
      "category": "Development"
    },
    "directories": {
      "app": "release/app",
      "buildResources": "assets",
      "output": "release/build"
    },
    "extraResources": [
      "./assets/**"
    ],
    "publish": {
      "provider": "github",
      "owner": "electron-react-boilerplate",
      "repo": "electron-react-boilerplate"
    }
  },
* */


//Not found: https://github.com/castlabs/electron-releases/releases/download/20.3.3+wvcus/electron-v20.3.3+wvcus-darwin-x64.zip
//           https://github.com/castlabs/electron-releases/releases/download/v20.3.3%2Bwvcus/electron-v20.3.3+wvcus-darwin-x64.zip
///          https://github.com/castlabs/electron-releases/releases/download/20.3.3+wvcus/electron-v20.3.3+wvcus-darwin-x64.zip