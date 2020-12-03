import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';
import auth0 from '../utils/auth0';

dbConnect();

export default async (req, res) => {
	const { method } = req;
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
				console.log({ loc: 'POST /api/user', body: req.body });
				const userExists = await User.findOne({ sub: req.body.sub });
				if (userExists) {
					return res.status(400).json({ success: false });
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
};
