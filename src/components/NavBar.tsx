import { ChildrenProp } from '../App';
import Logo from './Logo';

interface NavBarProps extends ChildrenProp {}

export default function NavBar({ children }: NavBarProps) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
