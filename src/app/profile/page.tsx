import { getSessionData } from '../../lib/test';
import Profile from '../components/ProfileSettingsClient';

export default async function ProfileSettings() {
  const session =await getSessionData()
  const id = session?.id; // Access user ID safely
  return <Profile id={id} />;
}
