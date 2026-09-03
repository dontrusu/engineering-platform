import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { NavigationState } from "./navigation-state";
import { SiteIdentityLink } from "./site-identity-link";

export function SiteNavigation({ children }: { children: React.ReactNode }) {
  return (
    <NavigationState>
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-md md:hidden">
        <SiteIdentityLink className="site-identity mx-6 mt-4 mb-3 inline-block text-primary">
          Engineering Lab
        </SiteIdentityLink>
        <MobileNavigation />
      </header>
      <div className="site-frame">
        <aside className="desktop-rail hidden md:block">
          <div className="desktop-rail-inner">
            <SiteIdentityLink className="site-identity text-primary">
              Engineering
              <br />
              Lab
            </SiteIdentityLink>
            <DesktopNavigation />
          </div>
        </aside>
        <div className="site-content">{children}</div>
      </div>
    </NavigationState>
  );
}
