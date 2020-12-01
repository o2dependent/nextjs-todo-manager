import React, { useRef } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';

export default function Modal({ closeModal, children }) {
	const ref = useRef();
	useOnClickOutside(ref, closeModal);

	return <div ref={ref}>{children}</div>;
}
