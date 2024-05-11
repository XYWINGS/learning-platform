import { NextPage } from 'next/types';
import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Head from 'next/head';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import { getColorNameWithIndex } from '../../../common/data/enumColors';
import { getFirstLetter } from '../../../helpers/helpers';
import TeamAddModal from '../course/add-new-course/TeamAddModal';

import axios from 'axios';
import useDarkMode from '../../../hooks/useDarkMode';
import { Item } from '../../../layout/Navigation/Navigation';
import moment from 'moment';
import router from 'next/router';
interface Course {
	_id: string;
	courseName: string;
	discription: string;
	part: number;
	enrollKey: string;
	document: any;
	status: any;
	price: number;
}

const Index: NextPage = () => {
	const [addModalStatus, setAddModalStatus] = useState<boolean>(false);
	const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
	const { darkModeStatus } = useDarkMode();
	const [course, setCourse] = useState<Course[]>([]);
	const [developers, setDevelopers] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [id, setId] = useState('');
	const [selectedRowIndex, setSelectedRowIndex] = useState(null);
	const [user, setUser] = useState<any>();
	const [users, setUsers] = useState<any>();

	useEffect(() => {
		const fetchData = async () => {
			const token = await localStorage.getItem('token');
			if (token) {
				try {
					const res = await axios.get('http://localhost:8080/current-user', {
						headers: {
							authorization: 'Bearer ' + token,
						},
					});
					setUser(res.data._id);
					console.log(res.data); // Assuming you want to log the response data
				} catch (error: any) {
					console.error('Error fetching current user:', error.message);
				}
			}
		};
		fetchData(); // Call the async function
	}, [course]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await axios
					.get(`http://localhost:8090/getcourse/${user}`)
					.then(async (res: any) => {
						await setCourse(res.data);
						// console.log(res.data)
					})
					.catch((err) => {
						console.error('Error fetching data: ', err);
					});
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};

		fetchData();
	}, [user, addModalStatus]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await axios
					.get(`http://localhost:8071/getallusers`)
					.then(async (res: any) => {
						await setUsers(res.data);
						console.log(res.data);
					})
					.catch((err) => {
						console.error('Error fetching data: ', err);
					});
			} catch (error) {
				console.error('Error fetching data: ', error);
			}
		};

		fetchData();
	}, [user, addModalStatus]);

	const onhandlechange = (index: any) => {
		setSelectedRowIndex((prevIndex) => (prevIndex === index ? null : index));
	};
	return (
		<PageWrapper>
			<Head>
				<title></title>
			</Head>
			<SubHeader>
				<SubHeaderLeft>
					{/* Search input */}
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder='Search course...'
						onChange={(event: any) => {
							setSearchTerm(event.target.value);
						}}
						value={searchTerm}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<SubheaderSeparator />
					{/* Button to open new employee modal */}
					<Button
						icon='PersonAdd'
						color='primary'
						isLight
						onClick={() => setAddModalStatus(true)}>
						New course
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div>
					{course
						.filter((val) => {
							if (searchTerm === '') {
								return val;
							} else if (
								val.courseName.toLowerCase().includes(searchTerm.toLowerCase())
							) {
								return val;
							}
						})
						.map((course, index) => (
							<>
							<p className="h4">Course Name :{course.courseName}</p>
								
							<table border={1} className='table table-modern table-hover mt-5'>
								<tbody>
								
								{users
									.filter((val: any) => {
										if (val.role == 'student') {
											return val;
										}
									})
									.map((user: any, index: any) => (
										<>
											{user.course
												.filter((val: any) => {
													if (val.id?.includes(course._id)) {
														return val;
													}
												})
												.map((course1: any, index: any) => (
													<>
													
													
													<tr key={course._id}>
											<td onClick={() => onhandlechange(index)}>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<div
															className='ratio ratio-1x1 me-3'
															style={{ width: 48 }}>
															<div
																className={`bg-l${
																	darkModeStatus ? 'o25' : '25'
																}-${getColorNameWithIndex(
																	Number(index),
																)} text-${getColorNameWithIndex(
																	index,
																)} rounded-2 d-flex align-items-center justify-content-center`}>
																<span className='fw-bold'>
																	{getFirstLetter(
																		user.name,
																	)}
																</span>
															</div>
														</div>
													</div>
													<div className='flex-grow-1'>
														<div className='fs-6 fw-bold'>
															{user.name}
														</div>
														
													</div>
												</div>
											</td>

											<td className='text-bold'>
														<div className='row'>
															<div className='col-6'>
																<Input
																	type='range'
																	value={(course1.rate/course?.part) * 100}
																	readOnly
																/>
															</div>
															<div className='col-6'>
																{(course1.rate /course?.part) * 100} %
															</div>
														</div>
													</td>
											
										
										</tr>
													</>
												))}
											
										</>
									))}
									</tbody>	
									</table>
							</>
						))}
				</div>
			</Page>
			<TeamAddModal setIsOpen={setAddModalStatus} isOpen={addModalStatus} id='' />
		</PageWrapper>
	);
};

export default Index;
