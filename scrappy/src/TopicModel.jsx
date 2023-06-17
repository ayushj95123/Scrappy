export default class TopicModel {
    constructor(data) {
      this.id = data._id;
      this.title = data.title;
      this.content = data.content;
    }
  
    editContent(newContent) {
      this.content = newContent;
    }
  
    static fromApiResponse(data) {
      return new TopicModel(data);
    }
}