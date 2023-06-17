import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  TextField,
  Button,
  Modal,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import ScrapBookModel from './ScrapBookModel';

const MyDrawer = () => {
  const [scrapbooks, setScrapbooks] = useState([]);
  const [addScrapbookModalOpen, setAddScrapbookModalOpen] = useState(false);
  const [newScrapbookTitle, setNewScrapbookTitle] = useState('');
  const [editScrapbookId, setEditScrapbookId] = useState(null);
  const [editScrapbookTitle, setEditScrapbookTitle] = useState('');
  const [editScrapbookModalOpen, setEditScrapbookModalOpen] = useState(false);
  const [editTopicId, setEditTopicId] = useState(null);
  const [editTopicTitle, setEditTopicTitle] = useState('');
  const [editTopicModalOpen, setEditTopicModalOpen] = useState(false);

  useEffect(() => {
    fetchScrapbooks();
  }, []);

  const fetchScrapbooks = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(
        'http://localhost:3000/scrapbooks/getScrapBooks',
        {
          headers: {
            authorization: accessToken,
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

  const handleAddScrapbook = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(
        'http://localhost:3000/scrapbooks/addScrapBook',
        {
          title: newScrapbookTitle,
        },
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      setAddScrapbookModalOpen(false);
      setNewScrapbookTitle('');
      fetchScrapbooks();
    } catch (error) {
      console.error('Error adding scrapbook:', error);
    }
  };

  const handleDeleteScrapbook = async (scrapbookId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.delete(
        `http://localhost:3000/scrapbooks/${scrapbookId}`,
        {
          headers: {
            authorization: accessToken,
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
    const scrapbook = scrapbooks.find((scrapbook) => scrapbook.id === scrapbookId);
    if (scrapbook) {
      setEditScrapbookId(scrapbookId);
      setEditScrapbookTitle(scrapbook.title);
      setEditScrapbookModalOpen(true);
    }
  };

  const handleUpdateScrapbook = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.put(
        `http://localhost:3000/scrapbooks/${editScrapbookId}`,
        {
          title: editScrapbookTitle,
        },
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      setScrapbooks((prevScrapbooks) =>
        prevScrapbooks.map((scrapbook) => {
          if (scrapbook.id === editScrapbookId) {
            scrapbook.title = editScrapbookTitle;
          }
          return scrapbook;
        })
      );
      setEditScrapbookModalOpen(false);
    } catch (error) {
      console.error('Error updating scrapbook:', error);
    }
  };

  const handleEditTopic = (topicId) => {
    const topic = scrapbooks
      .flatMap((scrapbook) => scrapbook.topics)
      .find((topic) => topic.id === topicId);
    if (topic) {
      setEditTopicId(topicId);
      setEditTopicTitle(topic.title);
      setEditTopicModalOpen(true);
    }
  };

  const handleUpdateTopic = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.put(
        `http://localhost:3000/topics/${editTopicId}`,
        {
          title: editTopicTitle,
        },
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      setScrapbooks((prevScrapbooks) =>
        prevScrapbooks.map((scrapbook) => {
          scrapbook.topics = scrapbook.topics.map((topic) => {
            if (topic.id === editTopicId) {
              topic.title = editTopicTitle;
            }
            return topic;
          });
          return scrapbook;
        })
      );
      setEditTopicModalOpen(false);
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  const handleAddTopic = async (selectedScrapbookId, topicTitle) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(
        `http://localhost:3000/topics/addTopic`,
        {
          title: topicTitle,
          createdOn: Date.now(),
          scrapBookId: selectedScrapbookId,
        },
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      setAddTopicModalOpen(false);
      setSelectedScrapbookId('');
      fetchScrapbooks();
    } catch (error) {
      console.error('Error adding topic:', error);
    }
  };

  const handleDeleteTopic = async (topicId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:3000/topics/${topicId}`, {
        headers: {
          authorization: accessToken,
        },
      });
      fetchScrapbooks();
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
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

  const [addTopicModalOpen, setAddTopicModalOpen] = useState(false);
  const [selectedScrapbookId, setSelectedScrapbookId] = useState('');
  const [newTopicTitle, setNewTopicTitle] = useState('');


  const handleAddTopicModalOpen = (scrapbookId) => {
    setSelectedScrapbookId(scrapbookId);
    setAddTopicModalOpen(true);
  };

  const handleAddTopicModalClose = () => {
    setAddTopicModalOpen(false);
    setSelectedScrapbookId('');
    setNewTopicTitle('');
  };

  const handleEditScrapbookModalClose = () => {
    setEditScrapbookModalOpen(false);
    setEditScrapbookId(null);
    setEditScrapbookTitle('');
  };

  const handleEditTopicModalClose = () => {
    setEditTopicModalOpen(false);
    setEditTopicId(null);
    setEditTopicTitle('');
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        <ListItem button onClick={() => setAddScrapbookModalOpen(true)}>
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
              <IconButton
                onClick={() => handleAddTopicModalOpen(scrapbook.id)}
              >
                <AddIcon />
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
      {/* Add Scrapbook Modal */}
      <Modal
        open={addScrapbookModalOpen}
        onClose={() => setAddScrapbookModalOpen(false)}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="add-scrapbook-modal-title">Add Scrapbook</h2>
          <TextField
            label="Title"
            value={newScrapbookTitle}
            onChange={(e) => setNewScrapbookTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleAddScrapbook}>
            Save
          </Button>
        </Box>
      </Modal>
      {/* Edit Scrapbook Modal */}
      <Modal
        open={editScrapbookModalOpen}
        onClose={handleEditScrapbookModalClose}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="edit-scrapbook-modal-title">Edit Scrapbook</h2>
          <TextField
            label="Title"
            value={editScrapbookTitle}
            onChange={(e) => setEditScrapbookTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleUpdateScrapbook}>
            Save
          </Button>
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
            onClick={handleEditScrapbookModalClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
      {/* Add Topic Modal */}
      <Modal
        open={addTopicModalOpen}
        onClose={handleAddTopicModalClose}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="add-topic-modal-title">Add Topic</h2>
          <TextField
            label="Title"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            onClick={() => handleAddTopic(selectedScrapbookId, newTopicTitle)}
          >
            Save
          </Button>
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
            onClick={handleAddTopicModalClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
      {/* Edit Topic Modal */}
      <Modal
        open={editTopicModalOpen}
        onClose={handleEditTopicModalClose}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2 id="edit-topic-modal-title">Edit Topic</h2>
          <TextField
            label="Title"
            value={editTopicTitle}
            onChange={(e) => setEditTopicTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleUpdateTopic}>
            Save
          </Button>
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
            onClick={handleEditTopicModalClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </Drawer>
  );
};

export default MyDrawer;
