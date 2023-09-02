import net.sf.json.JSONObject;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/text")
public class text extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        String s = request.getReader().readLine();
        JSONObject json = JSONObject.fromObject(s);
        String type = json.getString("type");
        if(type.equals("a"))
            out.write("a");
        else if (type.equals("b")) {
            out.write("b");
        }
    }

}