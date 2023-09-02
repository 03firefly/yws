import net.sf.json.JSONObject;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
@WebServlet("/ajax1")
public class Ajax1 extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String s = request.getReader().readLine();
        JSONObject json = JSONObject.fromObject(s);
        String name = json.getString("name");
        String psw = json.getString("password");
        String em = json.getString("email");
        String gd = json.getString("gender");
        String str = "insert into user(name,password,email,gender) values('"+name+"','"+psw+"','"+em+"','"+gd+"')";
        Druid d = new Druid();
        d.getDruid(str);
        List list = new ArrayList<>(Druid.userMap.keySet());
        System.out.println(list.size()-1);
        out.write((list.size()-1)+"");
    }

}