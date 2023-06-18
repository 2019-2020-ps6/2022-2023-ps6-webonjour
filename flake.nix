{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
    devenv.url = "github:cachix/devenv";
  };

  outputs = {
    self,
    nixpkgs,
    devenv,
    systems,
    ...
  } @ inputs: let
    forEachSystem = nixpkgs.lib.genAttrs (import systems);
  in {
    devShells =
      forEachSystem
      (system: let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        default = devenv.lib.mkShell {
          inherit inputs pkgs;
          modules = [
            {
              packages = with pkgs; [git nodejs nodePackages_latest.pnpm nodePackages_latest.prisma openssl prisma-engines playwright];
              languages.typescript.enable = true;

              env = with pkgs; {
                PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "true";
                PLAYWRIGHT_BROWSERS_PATH = "${pkgs.playwright.browsers}";
                PLAYWRIGHT_BROWSERS_VERSION = "${pkgs.playwright.version}";

                PRISMA_MIGRATION_ENGINE_BINARY = "${prisma-engines}/bin/migration-engine";
                PRISMA_QUERY_ENGINE_BINARY = "${prisma-engines}/bin/query-engine";
                PRISMA_QUERY_ENGINE_LIBRARY = "${prisma-engines}/lib/libquery_engine.node";
                PRISMA_INTROSPECTION_ENGINE_BINARY = "${prisma-engines}/bin/introspection-engine";
                PRISMA_FMT_BINARY = "${prisma-engines}/bin/prisma-fmt";
              };
            }
          ];
        };
      });
  };
}
