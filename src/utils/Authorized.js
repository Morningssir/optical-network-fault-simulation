import RenderAuthorize from '@/components/Authorized';
import { getAuthority } from './authority';

const Authorized = RenderAuthorize(getAuthority());

export default Authorized;
