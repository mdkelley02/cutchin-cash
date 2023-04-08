package cutchin_cash.utils;

import java.io.File;

import com.google.gson.TypeAdapter;

public class GsonFileTypeAdapter extends TypeAdapter<File> {
    @Override
    public void write(com.google.gson.stream.JsonWriter out, File value) throws java.io.IOException {
        out.value(value.getAbsolutePath());
    }

    @Override
    public File read(com.google.gson.stream.JsonReader in) throws java.io.IOException {
        return new File(in.nextString());
    }
}
