import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;

public class UploadServlet extends HttpServlet {

    protected void Get(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getOutputStream().println("Image: " + request.getParameter("filename"));
    }

    protected void Post(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Collection<Part> parts = request.getParts();

        for (Part part : parts) {
            String contentType = part.getContentType();
            System.out.println("contentType = " + contentType);

            System.out.println("file = " + part.toString());

            InputStream stream = part.getInputStream();
            String content = stream.toString();
            System.out.println("content = " + content);
        }

        response.getOutputStream().println("<html><body>The file has been uploaded</body></html>");
    }
}