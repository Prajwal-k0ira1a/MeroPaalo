import QRCode from "qrcode";

export const generateQR = async (req, res) => {
    const { institution, department } = req.query;

    if (!institution || !department) {
        return res.status(400).json({
            success: false,
            message: "institution and department are required",
        });
    }

    // Change frontend URL if different
    const joinUrl = `http://localhost:3000/join?institution=${institution}&department=${department}`;

    try {
        const qrImage = await QRCode.toDataURL(joinUrl);

        res.json({
            success: true,
            data: {
                joinUrl,
                qrImage, // base64 image
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to generate QR",
        });
    }
};
