package ciberseguridad;
import javax.crypto.*;
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.nio.file.Files;

public class DESGui extends JFrame {
    private JTextArea textArea;
    private JButton cargarBtn, cifrarBtn, descifrarBtn;
    private File archivo;
    private SecretKey clave;
    private Cipher cifrador;

    public DESGui() {
        setTitle("Cifrado DES");
        setSize(400, 300);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        textArea = new JTextArea();
        textArea.setEditable(false);
        add(new JScrollPane(textArea), BorderLayout.CENTER);

        JPanel panel = new JPanel();
        cargarBtn = new JButton("Cargar archivo");
        cifrarBtn = new JButton("Cifrar");
        descifrarBtn = new JButton("Descifrar");

        panel.add(cargarBtn);
        panel.add(cifrarBtn);
        panel.add(descifrarBtn);
        add(panel, BorderLayout.SOUTH);

        cargarBtn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                JFileChooser fileChooser = new JFileChooser();
                int result = fileChooser.showOpenDialog(null);
                if (result == JFileChooser.APPROVE_OPTION) {
                    archivo = fileChooser.getSelectedFile();
                    textArea.setText("Archivo cargado: " + archivo.getName());
                }
            }
        });

        cifrarBtn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                if (archivo != null) {
                    try {
                        generarClave();
                        File cifrado = new File(archivo.getName() + ".cifrado");
                        procesarArchivo(Cipher.ENCRYPT_MODE, archivo, cifrado);
                        textArea.append("\nArchivo cifrado correctamente.");

                        // Mostrar el contenido cifrado en formato hexadecimal
                        byte[] cifradoBytes = Files.readAllBytes(cifrado.toPath());
                        String cifradoHex = bytesToHex(cifradoBytes);
                        textArea.append("\nContenido cifrado (hexadecimal):\n" + cifradoHex);
                    } catch (Exception ex) {
                        textArea.append("\nError al cifrar: " + ex.getMessage());
                    }
                }
            }
        });

        descifrarBtn.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                if (archivo != null) {
                    try {
                        File descifrado = new File(archivo.getName() + ".descifrado");
                        procesarArchivo(Cipher.DECRYPT_MODE, new File(archivo.getName() + ".cifrado"), descifrado);
                        textArea.append("\nArchivo descifrado correctamente.");

                        // Mostrar el contenido descifrado en formato hexadecimal
                        byte[] descifradoBytes = Files.readAllBytes(descifrado.toPath());
                        String descifradoHex = bytesToHex(descifradoBytes);
                        textArea.append("\nContenido descifrado (hexadecimal):\n" + descifradoHex);
                    } catch (Exception ex) {
                        textArea.append("\nError al descifrar: " + ex.getMessage());
                    }
                }
            }
        });
    }

    private void generarClave() throws Exception {
        KeyGenerator generadorDES = KeyGenerator.getInstance("DES");
        generadorDES.init(56);
        clave = generadorDES.generateKey();
        cifrador = Cipher.getInstance("DES/ECB/PKCS5Padding");
    }

    private void procesarArchivo(int modo, File entrada, File salida) throws Exception {
        cifrador.init(modo, clave);
        try (FileInputStream fis = new FileInputStream(entrada); FileOutputStream fos = new FileOutputStream(salida)) {
            byte[] buffer = new byte[1000];
            int bytesLeidos;
            while ((bytesLeidos = fis.read(buffer)) != -1) {
                byte[] output = cifrador.update(buffer, 0, bytesLeidos);
                if (output != null) fos.write(output);
            }
            byte[] output = cifrador.doFinal();
            if (output != null) fos.write(output);
        }
    }

    // Método para convertir bytes a formato hexadecimal
    private String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            hexString.append(String.format("%02X", b));
        }
        return hexString.toString();
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            DESGui gui = new DESGui();
            gui.setVisible(true);
        });
    }
}
