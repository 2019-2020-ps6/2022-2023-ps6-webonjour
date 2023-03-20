{ pkgs, ... }:

{
  # https://devenv.sh/packages/
  packages = with pkgs; [ git nodejs-slim nodePackages_latest.pnpm ];
  languages.typescript.enable = true;
}
