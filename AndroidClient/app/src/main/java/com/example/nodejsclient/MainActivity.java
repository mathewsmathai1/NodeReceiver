package com.example.nodejsclient;

import android.content.Intent;
import android.os.Bundle;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.renderscript.ScriptGroup;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.EditText;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final Button fab = findViewById(R.id.fab);
        final EditText userField = findViewById(R.id.editTextTextPersonName);
        final EditText passField = findViewById(R.id.editTextTextPassword);


        fab.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                fab.setText("Welcome To Qracle");

                final String username = userField.getText().toString();
                final String password = passField.getText().toString();


                //Intent intent1 = new Intent(getApplicationContext(),MainActivity.class);


                Thread thread = new Thread(new Runnable() {

                    @Override
                    public void run() {
                        URL url = null;
                        try {
                            //url = new URL("http://n2l22.000webhostapp.com/Qracle.php?Hello=NoSpaceValidCheck");
                            //https://tranquil-magnetic-impatiens.glitch.me/
                           url = new URL("https://nodereceiver.herokuapp.com/");
                            //http://localhost:2227/
                            //url = new URL("http://10.0.2.2:2227/");

                        } catch (MalformedURLException e) {
                            e.printStackTrace();
                        }
                        HttpURLConnection urlConnection = null;
                        InputStreamReader read;
                        BufferedInputStream in;
                        try {

                            //urlConnection.setRequestMethod("POST");
                            //urlConnection.setDoOutput(true);
                            urlConnection = (HttpURLConnection) url.openConnection();
                            urlConnection.setRequestMethod("POST");
                            urlConnection.setDoOutput(true);

                           // read = new InputStreamReader(urlConnection.getInputStream());
                            //String urlParameters = "param1=a&param2=b&param3=c";
                            String urlParameters = "{\n" +
                                    "    \"name\": \""+username+"\",\n" +
                                    "    \"Password\": \""+password+"\"\n" +
                                    "}";
                            //URL url = new URL("http://example.com/index.php");
                            //URLConnection conn = url.openConnection();

                            //conn.setDoOutput(true);

                            OutputStreamWriter writer = new OutputStreamWriter(urlConnection.getOutputStream());

                            writer.write(urlParameters);
                            writer.flush();

                            String line;
                            BufferedReader reader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));

                          /*  while ((line = reader.readLine()) != null) {
                                System.out.println(line);
                            } */
                            line = reader.readLine();
                            writer.close();
                            reader.close();

                            char temp[] = new char[40];
                            //read.read(temp,0,40);
                            //in = new BufferedInputStream(read);
                            //final char c = temp[0];
                            final String c = new String(temp);
                            //int x = ;
                            final int n = urlConnection.getResponseCode();
                            final String s = urlConnection.getResponseMessage();
                            final String line_f = line;
                            runOnUiThread(new Runnable () {
                                @Override
                                public void run() {
                                    fab.setText(s+" : "+n+" : "+line_f);
                                }
                            });

                            //Intent i = new Intent(getApplicationContext(),MainActivity2.class);
                            //startActivity(i);





                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                });

                thread.start();
                //fab.setText(s);
             /*   try {
                    urlConnection.setDoOutput(true);
                    urlConnection.setChunkedStreamingMode(0);

                    OutputStream out = new BufferedOutputStream(urlConnection.getOutputStream());
                    //out.write(55);
                    //fab.setText(""+urlConnection.getResponseCode());


                } catch (IOException e) {
                    e.printStackTrace();

                } finally {
                    urlConnection.disconnect();
                }*/
                //startActivity(intent1);
                //fab.set
                        //("This is new Text");
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}
