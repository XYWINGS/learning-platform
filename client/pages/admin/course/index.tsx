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
// import TeamAddModal from './add-new-course/TeamAddModal';
import axios from 'axios';
import useDarkMode from '../../../hooks/useDarkMode';
import { Item } from '../../../layout/Navigation/Navigation';
import moment from 'moment';
import router from 'next/router';
interface Course {
	_id: string;
	courseName: string;
	discription: string;
	part: string;
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
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await axios
					.get(`http://localhost:8090/getallcourse`)
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
	}, [user, addModalStatus,developers]);

	const onhandlechange = (index: any) => {
		setSelectedRowIndex((prevIndex) => (prevIndex === index ? null : index));
	};
  const handlechangestatus=async (course:any,type:any)=>{
    console.log(course)
    if (type=="pending"){
      course.status="accept"
    }
    else{
      course.status="pending"
    }
    console.log(course)
    try {
      await axios
        .put(`http://localhost:8090/updatecourse/${course._id}`,course)
        .then(async (res: any) => {
          await setDevelopers(res.data);
          console.log(res.data)
        })
        .catch((err) => {
          console.error('Error fetching data: ', err);
        });
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }
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
					<table border={1} className='table table-modern table-hover mt-5'>
						<thead>
							<tr>
								<th>Course Name</th>
								<th>description</th>
								<th>Enrollment Key</th>
								<th>Course Content count</th>
								<th>Course Price</th>
								<th>Status</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{course
								.filter((val) => {
									if (searchTerm === '') {
										return val;
									} else if (
										val.courseName
											.toLowerCase()
											.includes(searchTerm.toLowerCase())
									) {
										return val;
									}
								})
								.map((course, index) => (
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
																		course.courseName,
																	)}
																</span>
															</div>
														</div>
													</div>
													<div className='flex-grow-1'>
														<div className='fs-6 fw-bold'>
															{course.courseName}
														</div>
														<div className='text-muted'>
															<Icon icon='Label' />{' '}
															<small>{course.status}</small>
														</div>
													</div>
												</div>
											</td>

											<td>
												<div>{course.discription}</div>
											</td>
											<td>{course.enrollKey}</td>
											<td>{course.part}</td>
											<td>{course.price}</td>
											<td>{course.status}</td>
											<th>
												<div className='form-check form-switch'>
													<input
														className='form-check-input'
														type='checkbox'
														role='switch'
														id={`flexSwitchCheck${course._id}`} // Set a unique ID for each switch
														checked={course.status === 'accept'} // Set checked based on course status
														onChange={() => {
													handlechangestatus(course,course.status)
														}}
													/>
												</div>
											</th>
										</tr>
									</>
								))}
						</tbody>
					</table>
				</div>
			</Page>
			{/* <TeamAddModal setIsOpen={setAddModalStatus} isOpen={addModalStatus} id='' /> */}
		</PageWrapper>
	);
};

export default Index;
