import Box from '../Box';
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons'

const ProfileSidebar = ({ githubUser }) => {
    return (
      <Box>
        <img src={githubUser.avatar_url} style={{ borderRadius: '8px' }} />
        <hr />
  
        <p>
          <a className="boxLink" href={githubUser.html_url}>
            @{githubUser.login}
          </a>
        </p>
        <hr />
        <AlurakutProfileSidebarMenuDefault />
      </Box>
    )
}

export default ProfileSidebar;

