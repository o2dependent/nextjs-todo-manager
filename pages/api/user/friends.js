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
				await User.find({ sub: user.sub })
					.populate('friends')
					.exec((err, reqUser) => {
						if (err || !reqUser) {
							return res
								.status(400)
								.json({ success: false, message: 'User not found' });
						}

						console.log({ reqUser });
						res
							.status(200)
							.json({ success: true, friends: reqUser[0].friends });
					});
				// res.status(200).json({ success: true, User });
			} catch (err) {
				console.error(err);
				res.status(400).json({ success: false });
			}
			break;
		// Add user to friends list
		case 'PUT':
			try {
				const reqUser = await User.findOne({ sub: user.sub });
				const foundUser = await User.findOne({
					friend_id: req.body.friend_id,
				});
				if (!foundUser || !reqUser) {
					return res.status(400).json({
						success: false,
						message: 'A user in the request was not found',
					});
				}
				if (
					reqUser.friends.some(
						(friendId) => String(friendId) === String(foundUser._id)
					)
				) {
					return res
						.status(400)
						.json({ success: false, message: 'Duplicate user found' });
				}
				reqUser.friends.push(foundUser);
				foundUser.friends.push(reqUser);
				await foundUser.save();
				await reqUser.save();
				res.status(200).json({
					success: true,
					foundUser,
					message: 'User added to friends list',
				});
			} catch (err) {
				console.error(err);
				return res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400);
			break;
	}
});
