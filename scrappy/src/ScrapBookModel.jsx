import TopicModel from './TopicModel';
export default class ScrapBookModel {
  constructor(data) {
    this.id = data._id;
    this.userId = data.userId;
    this.title = data.title;
    this.createdOn = data.createdOn;
    this.topics = data.topics.map((topicData) => TopicModel.fromApiResponse(topicData)) || [];
    this.isExpanded = false;
  }

  toggleTopics() {
    this.isExpanded = !this.isExpanded;
  }

  addTopic(topic) {
    this.topics.push(topic);
  }

  deleteTopic(topicId) {
    this.topics = this.topics.filter((topic) => topic.id !== topicId);
  }

  editTitle(newTitle) {
    this.title = newTitle;
  }

  static fromApiResponse(data) {
    console.log("Data Here:", data)
    return new ScrapBookModel(data);
  }
}
