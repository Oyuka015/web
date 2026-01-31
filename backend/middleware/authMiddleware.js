import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Нэвтрэх эрхгүй байна. Токен олдсонгүй." });
    }

    jwt.verify(token, process.env.JWT_SECRET||"tanii_nuuts_tulkhuur", (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Токен хүчингүй эсвэл хугацаа нь дууссан байна." });
        }
        
        req.user = user;
        next(); 
    });
};

export default authenticateToken;