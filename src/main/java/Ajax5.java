import net.sf.json.JSONObject;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
@WebServlet("/ajax5")
public class Ajax5 extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String s = request.getReader().readLine();
        JSONObject json = JSONObject.fromObject(s);
        String type = json.getString("type");
        Druid druid = new Druid();
        if(type.equals("get")){
            druid.getDruid("");
            Druid.articleMap.put("0",Druid.articleMap.size());
            JSONObject  jsonObject = JSONObject.fromObject(Druid.articleMap);
            out.write(jsonObject.toString());
        } else if (type.equals("article")) {
            String key = json.getString("key");
            Article article = new Article();
            article = (Article) Druid.articleMap.get(key);
            JSONObject jsonObject = JSONObject.fromObject(article);
            out.write(jsonObject.toString());
        } else if (type.equals("attention")) {
            String Uid = json.getString("Uid");
            String id = json.getString("id");
            String value = json.getString("value");
            if(value.equals("关注")){
                String sql = "insert into action(Uid,id,Ctype) values('"+Uid+"','"+id+"','关注')";
                druid.getDruid(sql);
                out.write("已关注");
            } else if (value.equals("已关注")) {
                String sql = "delete from action where Uid="+Uid+" and id="+id+" and `Ctype`='关注'";
                druid.getDruid(sql);
                out.write("关注");
            }

        }else if (type.equals("collect")) {
            String Uid = json.getString("Uid");
            String id = json.getString("id");
            String value = json.getString("value");
            if(value.equals("收藏")){
                String sql = "insert into action(Uid,id,Ctype) values('"+Uid+"','"+id+"','收藏')";
                druid.getDruid(sql);
                out.write("已收藏");
            } else if (value.equals("已收藏")) {
                String sql = "delete from action where Uid="+Uid+" and id="+id+" and `Ctype`='收藏'";
                druid.getDruid(sql);
                out.write("收藏");
            }

        }else if (type.equals("value")) {
            String Uid = json.getString("Uid");
            String id = json.getString("id");
            String key = json.getString("key");
            int a=0,c=0;
            druid.getDruid("");
            for (int i=1;i<=Druid.actionMap.size();i++){
                Action action = (Action) Druid.actionMap.get(i+"");
                if (action.getUid()==Integer.parseInt(Uid)&&action.getId()==Integer.parseInt(id))
                    a = action.getCtype().length();
                if (action.getUid()==Integer.parseInt(Uid)&&action.getId()==Integer.parseInt(key))
                    c = action.getCtype().length();
                if(a!=0&&c!=0)
                    break;
            }
            out.write("{\"attention\":"+ a +",\"collect\":"+ c +"}");
        }else if (type.equals("delete")) {
            int n = json.getInt("0");
            String sql;
            int Aid;
            for (int i=1;i<=n;i++){
//                Aid = json.getString(i+"");
               Aid = json.getInt(i+"");
                System.out.println(Aid);
                sql = "delete from article where Aid="+Aid;
                druid.getDruid(sql);
            }
            out.write("删除成功");
        }


    }
}

