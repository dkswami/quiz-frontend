import React from 'react'

const Attempts = ({ token_data }) => {
  return (
    <div>Attempts</div>
  )
}

export function getServerSideProps({ req, res }) {
	return { props: { token_data: req.cookies.token || "" } };
}

export default Attempts;