import net.sf.json.JSONObject;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

@WebServlet("/ajax7")
public class Ajax7 extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String s = request.getReader().readLine();
        JSONObject json = JSONObject.fromObject(s);
        String info = json.getString("info");
//        System.out.println(info);
        HashMap map = new HashMap<>();
        User user;
        Article article;
        boolean bl;
        int n=0;
        Druid d = new Druid();
        d.getDruid("");
        Set userKey = Druid.userMap.keySet();
        Set articleKey = Druid.articleMap.keySet();
        if (!info.isEmpty()) {
            for (Object key : userKey) {
                user = (User) Druid.userMap.get(key.toString());
                if (user.getName().contains(info) || (user.getId() + "").contains(info)) {
                    n++;
                    map.put(n + "", user);
                }
            }
            for (Object key : articleKey) {
                article = (Article) Druid.articleMap.get(key.toString());
                bl = article.getTitle().contains(info) || article.getContent().contains(info) || article.getAuthorName().contains(info) || article.getAtype().contains(info) || (article.getTitle() + article.getAuthorName()).contains(info);
                if (bl) {
                    n++;
                    map.put(n + "", article);
                }
            }
        }
        map.put("0",map.size());
        JSONObject jsonObject = JSONObject.fromObject(map);
        out.write(jsonObject.toString());
    }

}