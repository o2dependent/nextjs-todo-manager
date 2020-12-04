import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';
import auth0 from '../utils/auth0';

dbConnect();

export default auth0.requireAuthentication(async (req, res) => {
	const { method } = req;
	const { user } = await auth0.getSession(req);
	switch (method) {
		case 'GET':
			try {
				// const user = await User.find({ sub: user.sub });
				// res.status(200).json({ success: true, User });
			} catch (err) {
				console.error(err);
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const userExists = await User.findOne({ sub: req.body.sub });
				// TODO : Don't re initialize the friend id on each page refresh
				if (userExists) {
					userExists.friend_id = req.body.friend_id;
					userExists.save();
					return res.status(200).json({ success: true, userExists });
				}
				const user = await User.create(req.body);
				res.status(201).json({ success: true, user });
			} catch (err) {
				console.error(err);
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400);
			break;
	}
});
