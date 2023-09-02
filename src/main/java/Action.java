public class Action {
    private int Uid,id,key;
    private String Ctype;

    public Action(int uid, int id, int key, String ctype) {
        Uid = uid;
        this.id = id;
        this.key = key;
        Ctype = ctype;
    }

    public Action() {
    }

    public int getUid() {
        return Uid;
    }

    public void setUid(int uid) {
        Uid = uid;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCtype() {
        return Ctype;
    }

    public void setCtype(String ctype) {
        Ctype = ctype;
    }

    public int getKey() {
        return key;
    }

    public void setKey(int key) {
        this.key = key;
    }
}
