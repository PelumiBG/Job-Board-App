// Checking role before checking role
export const roleMiddleware = async (req, res, next) => {
    try{
        if(req.user.role !== 'candidate') {
            return res.status(403).json({ success:false, message:'Candidate is Authorized for this Page'})
        } else if (req.user.role !== 'Employer') {
            return res.status(403).json({ success:false, message:'Emploers Is Authorized for this Page'});
        }
        next();
    } catch(err){
        res.status(403).json({ success:false, message:err.message})
    }
}