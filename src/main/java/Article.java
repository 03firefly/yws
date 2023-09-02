public class Article {
    private int Aid,authorId,key;
    private String title,authorName,Atype,content,time;
    private String myClass = "article";

    public Article(int aid, int authorId, int key, String title, String authorName, String atype, String content, String time) {
        Aid = aid;
        this.authorId = authorId;
        this.key = key;
        this.title = title;
        this.authorName = authorName;
        Atype = atype;
        this.content = content;
        this.time = time;
    }

    public Article() {
    }

    public int getAid() {
        return Aid;
    }

    public void setAid(int aid) {
        Aid = aid;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public int getKey() {
        return key;
    }

    public void setKey(int key) {
        this.key = key;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getAtype() {
        return Atype;
    }

    public void setAtype(String atype) {
        Atype = atype;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getMyClass() {
        return myClass;
    }

    public void setMyClass(String myClass) {
        this.myClass = myClass;
    }


}
