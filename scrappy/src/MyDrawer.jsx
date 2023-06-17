import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import ScrapBookModel from './ScrapBookModel';

const MyDrawer = () => {
  const [scrapbooks, setScrapbooks] = useState([]);

  useEffect(() => {
    const fetchScrapbooks = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(
          'http://localhost:3000/scrapbooks/getScrapBooks',
          {
            headers: {
              authorization: accessToken, // Pass the accessToken from cookies as Authorization header value
            },
          }
        );
        const data = response.data.map((scrapbookData) =>
          ScrapBookModel.fromApiResponse(scrapbookData)
        );
        setScrapbooks(data);
      } catch (error) {
        console.error('Error fetching scrapbooks:', error);
      }
    };

    fetchScrapbooks();
  }, []);

  const handleDeleteScrapbook = async (scrapbookId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.delete(
        `http://localhost:3000/scrapbooks/${scrapbookId}`,
        {
          headers: {
            authorization: accessToken, // Pass the accessToken from cookies as Authorization header value
          },
        }
      );
      setScrapbooks((prevScrapbooks) =>
        prevScrapbooks.filter((scrapbook) => scrapbook.id !== scrapbookId)
      );
    } catch (error) {
      console.error('Error deleting scrapbook:', error);
    }
  };

  const handleEditScrapbook = (scrapbookId) => {
    // TODO: Implement edit logic
  };

  const handleDeleteTopic = async (topicId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:3000/topics/${topicId}`, {
        headers: {
          authorization: accessToken, // Pass the accessToken from cookies as Authorization header value
        },
      });
      setScrapbooks((prevScrapbooks) =>
        prevScrapbooks.map((scrapbook) => {
          if (scrapbook.topics.some((topic) => topic.id === topicId)) {
            scrapbook.deleteTopic(topicId);
          }
          return scrapbook;
        })
      );
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  const handleEditTopic = (topicId) => {
    // TODO: Implement edit logic
  };

  const handleToggleTopics = (scrapbookId) => {
    setScrapbooks((prevScrapbooks) =>
      prevScrapbooks.map((scrapbook) => {
        if (scrapbook.id === scrapbookId) {
          scrapbook.toggleTopics();
        }
        return scrapbook;
      })
    );
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem button>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Create Scrapbook" />
        </ListItem>
        {scrapbooks.map((scrapbook) => (
          <React.Fragment key={scrapbook.id}>
            <ListItem button onClick={() => handleToggleTopics(scrapbook.id)}>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={scrapbook.title} />
              {scrapbook.isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              <IconButton onClick={() => handleEditScrapbook(scrapbook.id)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteScrapbook(scrapbook.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
            {scrapbook.isExpanded && (
              <List sx={{ marginLeft: 16 }}>
                {scrapbook.topics.map((topic) => (
                  <ListItem key={topic.id} button>
                    <ListItemText primary={topic.title} />
                    <IconButton onClick={() => handleEditTopic(topic.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTopic(topic.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
};

export default MyDrawer;
