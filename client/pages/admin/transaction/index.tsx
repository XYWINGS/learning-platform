import React, { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTour } from '@reactour/tour';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';

import ThemeContext from '../../../context/themeContext';
import useDarkMode from '../../../hooks/useDarkMode';
import { TABS, TTabs } from '../../../common/type/helper';
import Page from '../../../layout/Page/Page';

import router from 'next/router';
import axios from 'axios';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import Input from '../../../components/bootstrap/forms/Input';
import { getColorNameWithIndex } from '../../../common/data/enumColors';
import { getFirstLetter } from '../../../helpers/helpers';
interface Payment {
	_id: string;
	courseName: string;
	userid: string;
	username: string;
	price: string;
	status: any;
	date: any;
}

const Index: NextPage = () => {
	const [payment, setPayment] = useState<Payment[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
  const { darkModeStatus } = useDarkMode();
	useEffect(() => {
		const fetchData = async () => {
			try {
				await axios
					.get(`http://localhost:8070/getallpayment`)
					.then(async (res: any) => {
						await setPayment(res.data);
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
	}, []);

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
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div>
					<table border={1} className='table table-modern table-hover mt-5'>
						<thead>
							<tr>
								<th>User Name</th>
								<th>Price</th>
								<th>Status</th>
								<th>Date</th>
								<th>Course Name</th>
							
							</tr>
						</thead>
						<tbody>
							{payment
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
								.map((payment, index) => (
									<>
										<tr key={payment._id}>
											<td >
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
																		payment.username,
																	)}
																</span>
															</div>
														</div>
													</div>
													<div className='flex-grow-1'>
														<div className='fs-6 fw-bold'>
															{payment.username}
														</div>
														<div className='text-muted'>
															<Icon icon='Label' />{' '}
															<small>{payment._id}</small>
														</div>
													</div>
												</div>
											</td>

											<td>
												<div>{payment.price}</div>
											</td>
											<td>{payment.status}</td>
											<td>{payment.date}</td>
											<td>{payment.courseName}</td>
										
										
										</tr>
									</>
								))}
						</tbody>
					</table>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Index;
