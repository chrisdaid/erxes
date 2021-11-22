import React, { useState } from 'react';
import TimeLine from 'react-gantt-timeline';
import {
  GanttContainer,
  NavContainer,
  ModeTitle,
  ModeContainer,
  TimelineContainer
} from 'modules/boards/styles/viewtype';
import { withRouter } from 'react-router-dom';
import Button from 'modules/common/components/Button';
import { IOptions, IItem } from 'modules/boards/types';
import { IRouterProps } from 'modules/common/types';
import { __ } from 'modules/common/utils';

type Props = {
  length: number;
  items: IItem[];
  options: IOptions;
  refetch: () => void;
  groupType: string;
  save: (items: any[], links: any[]) => void;
} & IRouterProps;

const GanttChart = (props: Props) => {
  const config = {
    header: {
      top: {
        style: {
          backgroundColor: '#f7f9fa',
          fontSize: 12,
          color: '#393C40'
        }
      },
      middle: {
        style: {
          backgroundColor: 'lightgrey',
          fontSize: 9,
          color: '#393C40'
        }
      },
      bottom: {
        style: {
          background: 'white',
          fontSize: 9,
          color: '#393C40'
        },
        selectedStyle: {
          background: 'linear-gradient( #d011dd ,#d011dd)',
          fontWeight: 'bold',
          color: 'white'
        }
      }
    },
    taskList: {
      title: {
        label: 'Name',
        style: {
          backgroundColor: '#f7f9fa',
          color: '#393C40'
        }
      },
      task: {
        style: {
          backgroundColor: '#ffffff',
          color: '#393C40',
          textAlign: 'left',
          paddingLeft: 20
        }
      },
      verticalSeparator: {
        style: {
          backgroundColor: '#fbf9f9'
        },
        grip: {
          style: {
            backgroundColor: 'red'
          }
        }
      }
    },
    dataViewPort: {
      rows: {
        style: {
          cursorPointer: true,
          backgroundColor: '#fff',
          line: false
        }
      },
      task: {
        showLabel: true,
        style: {
          borderRadius: 3,
          boxShadow: '2px 2px 8px #888888'
        },
        selectedStyle: {
          borderRadius: 3,
          selectedColor: '#fff',
          boxShadow: '3px 3px 10px #673FBD'
        }
      }
    },
    links: {
      color: '#FDA50D',
      selectedColor: '#EA475D',
      lineShadow: '3px 3px 10px #FDA50D'
    }
  };

  const dbData: Array<any> = [];
  let dbLinks: Array<any> = [];

  props.items.forEach(item => {
    if (item.startDate && item.closeDate) {
      dbData.push({
        id: item._id,
        start: new Date(item.startDate),
        end: new Date(item.closeDate),
        name: item.name,
        color: '#5629B6'
      });

      if (item.relations) {
        dbLinks = dbLinks.concat(item.relations);
      }
    }
  });

  const [data, setData] = useState(dbData);
  const [links, setLinks] = useState(dbLinks);
  const [selectedItem, setSelectedItem] = useState(null);
  const [timelineMode, setTimelineMode] = useState('month');

  const onHorizonChange = (start, end) => {
    const result = dbData.filter(item => {
      return (
        (item.start < start && item.end > end) ||
        (item.start > start && item.start < end) ||
        (item.end > start && item.end < end)
      );
    });

    setData(result);
  };

  const onSelectItem = item => {
    setSelectedItem(item);
  };

  const onUpdateTask = (item, props) => {
    item.start = props.start;
    item.end = props.end;

    setData([...data]);
  };

  const createLink = (start, end) => {
    return {
      id: Math.random().toString(),
      start: start.task.id,
      startPosition: start.position,
      end: end.task.id,
      endPosition: end.position
    };
  };

  const onCreateLink = item => {
    let newLink = createLink(item.start, item.end);

    setLinks([...links, newLink]);
  };

  const modeChange = value => {
    setTimelineMode(value);
  };

  const deleteItem = () => {
    if (selectedItem) {
      const index = links.indexOf(selectedItem);

      if (index > -1) {
        links.splice(index, 1);

        setLinks([...links]);
      }
    }
  };

  const save = () => {
    const items: Array<any> = [];

    for (const item of data) {
      items.push({
        _id: item.id,
        startDate: item.start,
        closeDate: item.end
      });
    }

    props.save(items, links);
  };

  return (
    <GanttContainer>
      <NavContainer>
        <ModeTitle></ModeTitle>
        <ModeContainer>
          <Button
            btnStyle="simple"
            size="small"
            onClick={e => modeChange('day')}
          >
            {__('Day')}
          </Button>
          <Button
            btnStyle="simple"
            size="small"
            onClick={e => modeChange('week')}
          >
            {__('Week')}
          </Button>
          <Button
            btnStyle="simple"
            size="small"
            onClick={e => modeChange('month')}
          >
            {__('Month')}
          </Button>
          <Button
            btnStyle="simple"
            size="small"
            onClick={e => modeChange('year')}
          >
            {__('Year')}
          </Button>
          <Button btnStyle="danger" size="small" onClick={deleteItem}>
            {__('Delete')}
          </Button>
          <Button btnStyle="success" size="small" onClick={save}>
            {__('Save')}
          </Button>
        </ModeContainer>
      </NavContainer>
      <TimelineContainer>
        <TimeLine
          data={data}
          links={links}
          config={config}
          onHorizonChange={onHorizonChange}
          onSelectItem={onSelectItem}
          onUpdateTask={onUpdateTask}
          onCreateLink={onCreateLink}
          mode={timelineMode}
          itemheight={40}
          selectedItem={selectedItem}
          nonEditableName={true}
        />
      </TimelineContainer>
    </GanttContainer>
  );
};

export default withRouter(GanttChart);
