import seismicIcon from '../assets/seismic icon.png?format=webp&quality=80';
import driveIcon from '../assets/drive icon.png?format=webp&quality=80';
import zendeskIcon from '../assets/zendesk icon.png?format=webp&quality=80';
import onedriveIcon from '../assets/onedrive icon.png?format=webp&quality=80';
import highspotIcon from '../assets/highspot icon.png?format=webp&quality=80';
import slackIcon from '../assets/slack icon.png?format=webp&quality=80';
import gongIcon from '../assets/gong icon.png?format=webp&quality=80';
import hubspotIcon from '../assets/Hubspot Icon.png?format=webp&quality=80';
import notionIcon from '../assets/notion icon.png?format=webp&quality=80';
import teamsIcon from '../assets/teams icon.png?format=webp&quality=80';

export const INTEGRATION_COLUMNS = [
  {
    id: 'col-1',
    direction: 'up',
    duration: '15s',
    icons: [
      { name: 'seismic', src: seismicIcon },
      { name: 'drive', src: driveIcon },
      { name: 'zendesk', src: zendeskIcon },
      { name: 'onedrive', src: onedriveIcon },
    ],
  },
  {
    id: 'col-2',
    direction: 'down',
    duration: '18s',
    icons: [
      { name: 'highspot', src: highspotIcon },
      { name: 'slack', src: slackIcon },
      { name: 'gong', src: gongIcon },
    ],
  },
  {
    id: 'col-3',
    direction: 'up',
    duration: '20s',
    icons: [
      { name: 'hubspot', src: hubspotIcon },
      { name: 'notion', src: notionIcon },
      { name: 'teams', src: teamsIcon },
    ],
  },
];
