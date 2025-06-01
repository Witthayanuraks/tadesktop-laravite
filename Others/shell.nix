{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_23
    yarn
    mysql
    electron
    laravel
    chart.js
  ];

  shellHook = ''
    export ELECTRON_MIRROR=https://artifacts.electronjs.org/headers
    echo "Environment ready: Node $(node -v), Electron, MySQL"
  '';
}
