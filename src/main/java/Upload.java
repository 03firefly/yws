import net.sf.json.JSONObject;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
@WebServlet("/upload")
public class Upload extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String s = request.getReader().readLine();
        JSONObject json = JSONObject.fromObject(s);
        int number = json.getInt("0");
        String time = json.getString("时间");
       Druid druid = new Druid();
        druid.getDruid("");
        for(int i=1;i<=number;i++){
            Object object = json.get(i+"");
            JSONObject jsonObject = JSONObject.fromObject(object);
            int id = jsonObject.getInt("作者账号");
            String author =jsonObject.getString("作者");
            String kind = jsonObject.getString("类型");
            String title = jsonObject.getString("标题");
            String content = jsonObject.getString("内容");
            String sql = "insert into article(authorId,authorName,Atype,title,content,time) values('"+id+"','"+author+"','"+kind+"','"+title+"','"+content+"','"+time+"')";
            druid.getDruid(sql);
        }
        out.write("上传成功");
    }

}