

    const userlogout = async (req, res) => {
        return res.status(200).json({
            message: "Logout successful",
        });
    };

export{userlogout}