import java.util.ArrayList;
import java.util.List;

class MainApp {
    public static void main(String[] args) {
        final int a = 10;
        List<String> nameList = new ArrayList<>();
        nameList.add("abc1");
        nameList.add("abc2");
        nameList.add("abc3");
        nameList.add("abc4");

        nameList.forEach(name -> a++ );
    }
}