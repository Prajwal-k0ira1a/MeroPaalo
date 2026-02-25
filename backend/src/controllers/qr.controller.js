import QRCode from "qrcode";

export const generateQR = async (req, res) => {
    const { institution, department } = req.query;

    if (!institution || !department) {
        return res.status(400).json({
            success: false,
            message: "institution and department are required",
        });
    }

    const clientBaseUrl = (process.env.CLIENT_URL || "http://localhost:5173").replace(/\/$/, "");
    const joinUrl = `${clientBaseUrl}/join?institution=${institution}&department=${department}`;

    try {
        // Generate QR as buffer (binary PNG)
        const qrBuffer = await QRCode.toBuffer(joinUrl);

        // Send as PNG image
        res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Disposition": "inline; filename=qr.png",
        });
        res.end(qrBuffer);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to generate QR",
        });
    }
};
