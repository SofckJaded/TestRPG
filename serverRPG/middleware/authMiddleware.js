import jwt from 'jsonwebtoken'

export default (req, res, next) => {
	const token = (req.headers.token || '').replace(/Bearer\s?/, '')
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.SECRET_KEY)

			req.userId = decoded._id
			next()
		} catch (e) {
			console.log(e)
			return res.status(401).json({
				message: 'Not authorized',
			})
		}
	} else {
		return res.status(401).json({
			message: 'Not authorized',
		})
	}
}
