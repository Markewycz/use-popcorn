import { ChildrenProp } from '../App';

interface MainContentProps extends ChildrenProp {}

export default function MainContent({ children }: MainContentProps) {
  return <main className="main">{children}</main>;
}
