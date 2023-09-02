import net.sf.json.JSONObject;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

@WebServlet("/ajax6")
public class Ajax6 extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String s = request.getReader().readLine();
        JSONObject json = JSONObject.fromObject(s);
        String type = json.getString("type");
        String id = json.getString("id");
        Druid druid = new Druid();
        if(type.equals("publish")){
            String content = json.getString("content");
            String title = json.getString("title");
            if(content.length() != 0 && title.length() != 0){
                String kind = json.getString("kind");
                String time = json.getString("time");
                druid.getDruid("");
                String author =( (User)Druid.userMap.get(id)).getName();
                String sql = "insert into article(authorId,authorName,Atype,title,content,time) values('"+id+"','"+author+"','"+kind+"','"+title+"','"+content+"','"+time+"')";
//                System.out.println(sql);
                druid.getDruid(sql);
                out.write("发布成功");
            }
            else out.write("不能为空");
        } else if (type.equals("history")) {
            druid.getDruid("");
            HashMap map = new HashMap<>();
            Article article;
            int n = 1;
            for (int i=1;i<=Druid.articleMap.size();i++){
                article = (Article) Druid.articleMap.get(i+"");
                if(article.getAuthorId() == Integer.parseInt(id)){
                    map.put(n+"",article);
                    n++;
                }
            }
            map.put("0",map.size());
            JSONObject jsonObject = JSONObject.fromObject(map);
            out.write(jsonObject.toString());
        }else if (type.equals("collect")) {
            druid.getDruid("");
            HashMap map = new HashMap<>();
            Action action;
            int n = 1;
            for (int i=1;i<=Druid.actionMap.size();i++){
                action = (Action) Druid.actionMap.get(i+"");
                if(action.getUid()==Integer.parseInt(id)&&action.getCtype().equals("收藏")){
                    map.put(n+"",(Article)Druid.articleMap.get(action.getId()+""));
                    n++;
                }
            }
            map.put("0",map.size());
            JSONObject jsonObject = JSONObject.fromObject(map);
            out.write(jsonObject.toString());
        }else if (type.equals("attention")) {
            druid.getDruid("");
            HashMap map = new HashMap<>();
            Action action;
            int n = 1;
            for (int i=1;i<=Druid.actionMap.size();i++){
                action = (Action) Druid.actionMap.get(i+"");
                if(action.getUid()==Integer.parseInt(id)&&action.getCtype().equals("关注")){
                    map.put(n+"",Druid.userMap.get(action.getId()+""));
                    n++;
                }
            }
            JSONObject jsonObject = JSONObject.fromObject(map);
            out.write(jsonObject.toString());
        }else if (type.equals("delete")) {
            int n = json.getInt("0");
            String str,sql;
            String action = json.getString("action");
            for (int i=1;i<=n;i++){
                str = json.getString(i+"");
                sql = "delete from action where Uid="+id+" and id="+Integer.parseInt(str)+" and `Ctype`='"+ action +"'";
                druid.getDruid(sql);
            }
            out.write("删除成功");
        }else if (type.equals("get")) {
            druid.getDruid("");
            JSONObject jsonObject = JSONObject.fromObject(Druid.userMap);
            out.write(jsonObject.toString());
        }else if (type.equals("logout")) {
            int n = json.getInt("0");
            String str,sql;
            for (int i=1;i<=n;i++){
                str = json.getString(i+"");
                sql = "delete from user where Uid="+str;
                druid.getDruid(sql);
            }
            out.write("删除成功");
        }


    }
}

